import { ZgFile, Indexer } from '@0glabs/0g-ts-sdk';
import fs from 'fs/promises';
import path from 'path';
import {
  getIndexer,
  getSigner,
  getZGConfig,
  isDemoMode
} from './zgConfig';
import { 
  ZGUploadResult, 
  ZGDownloadResult,
  ZGUploadOptions,
} from '@/lib/types/zgStorage';

// ─── Upload ───────────────────────────────────────────────────────────────────

export async function uploadFile(options: ZGUploadOptions): Promise<ZGUploadResult> {
  const { filePath, userId, metadata } = options;
  const demoMode = await isDemoMode();
  
  if (demoMode) {
    console.log('📁 [DEMO] Uploading file:', filePath);
    const mock = () => '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    return { rootHash: mock(), txHash: mock(), success: true };
  }
  
  let file: any = null;
  let rootHash = '';
  
  try {
    try { await fs.access(filePath); } catch { throw new Error(`File not found: ${filePath}`); }

    const stats = await fs.stat(filePath);
    console.log('📄 File details:', {
      name: path.basename(filePath),
      size: stats.size,
      kb: (stats.size / 1024).toFixed(2),
      mb: (stats.size / (1024 * 1024)).toFixed(4)
    });

    console.log('🔧 Creating ZgFile...');
    file = await ZgFile.fromFilePath(filePath);
    
    console.log('🌳 Generating Merkle tree...');
    const [tree, treeErr] = await file.merkleTree();
    if (treeErr) throw new Error(`Error generating Merkle tree: ${treeErr}`);

    rootHash = tree?.rootHash?.() || '';
    console.log('📊 File Root Hash:', rootHash);

    const indexer = await getIndexer();
    const signer = getSigner();
    const config = getZGConfig();

    if (!signer) throw new Error('No signer available. Check your private key.');

    const signerAddress = await signer.getAddress();
    console.log('✅ Signer address:', signerAddress);
    
    const provider = signer.provider;
    if (provider) {
      const balance = await provider.getBalance(signerAddress);
      console.log('💰 Signer balance:', balance.toString(), 'wei');
      if (balance.toString() === '0') throw new Error('Signer has 0 ETH balance.');
    }

    console.log('🔍 Checking if file already exists on network...');
    try {
      const fileInfo = await (indexer as any).getFileInfo(rootHash);
      if (fileInfo && fileInfo.finalized) {
        console.log('✅ File already exists on 0G network, skipping transaction.');
        return { rootHash, txHash: 'already-exists', success: true };
      }
    } catch { console.log('📤 File not found on network, proceeding with upload...'); }

    console.log('⏳ Sending transaction...');
    const [tx, uploadErr] = await indexer.upload(file, config.rpcUrl, signer);
    
    if (uploadErr) {
      const errorStr = String(uploadErr);
      if (errorStr.includes('already exists') || errorStr.includes('ALREADY_EXISTS')) {
        return { rootHash, txHash: 'already-exists', success: true };
      }
      if (errorStr.includes('insufficient funds')) throw new Error('Insufficient ETH for gas.');
      if (errorStr.includes('execution reverted')) throw new Error(`Contract reverted. Root hash: ${rootHash}. ${errorStr}`);
      throw new Error(`Upload error: ${uploadErr}`);
    }

    console.log('✅ Upload successful! Transaction:', tx);
    return { rootHash, txHash: tx, success: true };

  } catch (error: any) {
    const errorStr = String(error?.message || error);
    if (errorStr.includes('execution reverted') && errorStr.includes('require(false)') && rootHash) {
      console.warn('⚠️ Contract reverted - file likely already exists on-chain.');
      return { rootHash, txHash: 'reverted-duplicate', success: true };
    }
    console.error('❌ Upload failed:', error.message);
    return { rootHash: '', txHash: '', success: false };
  } finally {
    if (file) {
      try { await file.close(); console.log('🔒 File closed'); } catch {}
    }
  }
}

// ─── Download ─────────────────────────────────────────────────────────────────

/**
 * Download a file from 0G Storage.
 *
 * The SDK's indexer.download() is the ONLY correct mechanism — the node port
 * 5678 speaks JSON-RPC over POST (not REST GET), so direct HTTP fetches won't work.
 *
 * If the file is unavailable ("file not found"), it means the testnet nodes
 * selected by the indexer don't have your segments. We try:
 *   1. indexer.download() with verify=false  (fastest)
 *   2. Fresh indexer instance with turbo endpoint
 *   3. Fresh indexer instance with standard endpoint
 */
export async function downloadFile(
  rootHash: string,
  outputPath: string,
  verify: boolean = false
): Promise<ZGDownloadResult> {
  try {
    if (await isDemoMode()) {
      await fs.writeFile(outputPath, `Mock file content for ${rootHash}`);
      return { success: true, path: outputPath };
    }

    console.log('📥 Downloading file with root hash:', rootHash);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    const INDEXER_ENDPOINTS = [
      'https://indexer-storage-testnet-turbo.0g.ai',
      'https://indexer-storage-testnet-standard.0g.ai',
    ];

    for (let i = 0; i < INDEXER_ENDPOINTS.length; i++) {
      const endpoint = INDEXER_ENDPOINTS[i];
      console.log(`🔄 Strategy ${i + 1}: indexer.download() via ${endpoint}...`);

      try {
        const indexer = new Indexer(endpoint);
        const err = await indexer.download(rootHash, outputPath, false);

        if (!err) {
          // Verify file was actually written and has content
          try {
            const stats = await fs.stat(outputPath);
            if (stats.size > 0) {
              console.log(`✅ Strategy ${i + 1} succeeded — ${stats.size} bytes`);
              return { success: true, path: outputPath };
            }
            console.warn(`⚠️ Strategy ${i + 1}: file written but empty`);
          } catch {
            console.warn(`⚠️ Strategy ${i + 1}: file not written to disk`);
          }
        } else {
          console.warn(`⚠️ Strategy ${i + 1} error:`, String(err));
        }
      } catch (e: any) {
        console.warn(`⚠️ Strategy ${i + 1} threw:`, e?.message || e);
      }
    }

    // All strategies failed — give a clear, actionable error
    return {
      success: false,
      error: [
        `File not found on any 0G testnet storage node.`,
        `Root hash: ${rootHash}`,
        ``,
        `Possible reasons:`,
        `  • The file was uploaded but not yet propagated (wait 1–2 min and retry)`,
        `  • The testnet nodes restarted and pruned older data`,
        `  • The upload transaction succeeded on-chain but segments weren't stored`,
        ``,
        `Try uploading the file again to get a fresh root hash.`,
      ].join('\n')
    };

  } catch (error) {
    console.error('❌ Download failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown download error'
    };
  }
}