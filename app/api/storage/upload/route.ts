import { NextRequest, NextResponse } from 'next/server';
import { uploadFile } from '@/lib/services/zgStorage';
import { isDemoMode } from '@/lib/services/zgConfig';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import os from 'os';

export async function POST(request: NextRequest) {
  let tempPath: string | null = null;
  
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string;
    const metadataStr = formData.get('metadata') as string;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Parse metadata if provided
    let metadata = {};
    if (metadataStr) {
      try {
        metadata = JSON.parse(metadataStr);
      } catch (e) {
        console.warn('Invalid metadata JSON:', metadataStr);
      }
    }

    // Check if we're in demo mode
    const demoMode = await isDemoMode();
    
    // Create temp directory if it doesn't exist
    const tempDir = path.join(os.tmpdir(), 'wastereturn');
    await mkdir(tempDir, { recursive: true });

    // Save file temporarily
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    tempPath = path.join(tempDir, `${Date.now()}_${file.name}`);
    await writeFile(tempPath, buffer);

    console.log('📁 Temp file saved:', tempPath);
    console.log('🔧 Mode:', demoMode ? 'DEMO' : 'REAL');

    // Upload to 0G
    const result = await uploadFile({
      filePath: tempPath,
      userId,
      metadata: {
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        uploadedAt: new Date().toISOString(),
        ...metadata
      }
    });

    // Clean up temp file
    if (tempPath) {
      await unlink(tempPath).catch(console.error);
    }

    if (!result.success) {
      return NextResponse.json(
        { error: 'Upload to 0G failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result,
      mode: demoMode ? 'demo' : 'real'
    });

  } catch (error: any) {
    console.error('❌ Upload API error:', error);
    
    // Clean up temp file on error
    if (tempPath) {
      await unlink(tempPath).catch(console.error);
    }
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Upload failed',
        demoMode: true
      },
      { status: 500 }
    );
  }
}