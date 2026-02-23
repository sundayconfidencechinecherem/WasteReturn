import { NextRequest, NextResponse } from 'next/server';
import { downloadFile } from '@/lib/services/zgStorage';
import { mkdir, unlink } from 'fs/promises';
import path from 'path';
import os from 'os';
import fs from 'fs';

export async function GET(request: NextRequest) {
  let outputPath: string | null = null;

  try {
    const rootHash = request.nextUrl.searchParams.get('rootHash');

    if (!rootHash) {
      return NextResponse.json(
        { error: 'rootHash is required' },
        { status: 400 }
      );
    }

    // Validate root hash format
    if (!rootHash.startsWith('0x') || rootHash.length !== 66) {
      return NextResponse.json(
        { error: 'Invalid root hash format. Expected 0x-prefixed 32-byte hex string.' },
        { status: 400 }
      );
    }

    console.log('📥 Downloading file with root hash:', rootHash);

    // Create temp directory
    const tempDir = path.join(os.tmpdir(), 'wastereturn-downloads');
    await mkdir(tempDir, { recursive: true });

    outputPath = path.join(tempDir, `${rootHash.slice(2, 18)}.bin`);

    // Remove old file if it exists from a previous failed attempt
    try {
      await unlink(outputPath);
    } catch {
      // File doesn't exist, that's fine
    }

    const result = await downloadFile(rootHash, outputPath, false); // verify=false for speed

    if (!result.success || !result.path) {
      console.error('❌ Download failed:', result.error);
      return NextResponse.json(
        {
          error: result.error || 'Download failed',
          hint: 'The file may not be available on testnet nodes yet. Files can take a few minutes to propagate after upload.',
          rootHash
        },
        { status: 500 }
      );
    }

    // Check the file actually has content
    const stats = await fs.promises.stat(result.path);
    if (stats.size === 0) {
      return NextResponse.json(
        { error: 'Downloaded file is empty', rootHash },
        { status: 500 }
      );
    }

    console.log('✅ File downloaded:', stats.size, 'bytes');

    // Read the file
    const fileBuffer = await fs.promises.readFile(result.path);

    // Detect content type from magic bytes
    const contentType = detectContentType(fileBuffer);
    const ext = contentTypeToExt(contentType);

    // Clean up temp file
    await unlink(result.path).catch(console.error);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Disposition': `attachment; filename="${rootHash.slice(0, 10)}${ext}"`,
        'Content-Type': contentType,
        'Content-Length': fileBuffer.length.toString(),
      },
    });

  } catch (error: any) {
    console.error('❌ Download API error:', error);

    // Clean up temp file on error
    if (outputPath) {
      await unlink(outputPath).catch(() => {});
    }

    const errorStr = String(error?.message || error);
    let userError = 'Download failed';
    let hint = '';

    if (errorStr.includes('file not found') || errorStr.includes('not found') || errorStr.includes('404')) {
      userError = 'File not found on 0G network';
      hint = 'This root hash does not exist on the testnet. Make sure the file was successfully uploaded first.';
    } else if (errorStr.includes('timeout') || errorStr.includes('ECONNREFUSED')) {
      userError = 'Storage node unreachable';
      hint = 'The 0G testnet storage nodes may be temporarily unavailable. Try again in a moment.';
    } else if (errorStr.includes('ENOENT')) {
      userError = 'File not found on storage nodes';
      hint = 'The file may not have propagated to all nodes yet. Wait a minute and try again.';
    }

    return NextResponse.json(
      { error: userError, hint, detail: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

/**
 * Detect MIME type from file magic bytes
 */
function detectContentType(buffer: Buffer): string {
  // PNG: 89 50 4E 47
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
    return 'image/png';
  }
  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return 'image/jpeg';
  }
  // GIF: 47 49 46
  if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) {
    return 'image/gif';
  }
  // WebP: 52 49 46 46 ... 57 45 42 50
  if (buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46) {
    return 'image/webp';
  }
  // PDF: 25 50 44 46
  if (buffer[0] === 0x25 && buffer[1] === 0x50 && buffer[2] === 0x44 && buffer[3] === 0x46) {
    return 'application/pdf';
  }
  // Plain text (UTF-8 or ASCII printable)
  const sample = buffer.slice(0, 512);
  const isPrintable = [...sample].every(b => b === 9 || b === 10 || b === 13 || (b >= 32 && b <= 126));
  if (isPrintable) {
    return 'text/plain';
  }

  return 'application/octet-stream';
}

function contentTypeToExt(contentType: string): string {
  const map: Record<string, string> = {
    'image/png': '.png',
    'image/jpeg': '.jpg',
    'image/gif': '.gif',
    'image/webp': '.webp',
    'application/pdf': '.pdf',
    'text/plain': '.txt',
    'application/octet-stream': '.bin',
  };
  return map[contentType] ?? '.bin';
}