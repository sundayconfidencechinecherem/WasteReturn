// scripts/test-upload.ts
// Run with: npx ts-node scripts/test-upload.ts
import { ZgFile, Indexer } from '@0glabs/0g-ts-sdk';
import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';
import os from 'os';

const RPC_URL = 'https://evmrpc-testnet.0g.ai';
const INDEXER_RPC = 'https://indexer-storage-testnet-turbo.0g.ai';
const PRIVATE_KEY = process.env.PRIVATE_KEY || '';

async function main() {
  if (!PRIVATE_KEY) {
    console.error('Set PRIVATE_KEY env var');
    process.exit(1);
  }

  // Create a test file with enough content
  const testPath = path.join(os.tmpdir(), 'zg-test-' + Date.now() + '.txt');
  // Write 100KB of content - sometimes very small files cause issues
  fs.writeFileSync(testPath, 'A'.repeat(100 * 1024));
  console.log('Test file:', testPath, fs.statSync(testPath).size, 'bytes');

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);
  const indexer = new Indexer(INDEXER_RPC);

  console.log('Signer:', await signer.getAddress());
  console.log('Balance:', ethers.formatEther(await provider.getBalance(await signer.getAddress())), 'ETH');

  const file = await ZgFile.fromFilePath(testPath);
  const [tree, treeErr] = await file.merkleTree();
  if (treeErr) { console.error('Tree error:', treeErr); process.exit(1); }
  
  console.log('Root hash:', tree!.rootHash());

  const [tx, err] = await indexer.upload(file, RPC_URL, signer);
  await file.close();
  fs.unlinkSync(testPath);

  if (err) {
    console.error('Upload FAILED:', err);
  } else {
    console.log('Upload SUCCESS! tx:', tx);
    
    // Now try download
    const downloadPath = path.join(os.tmpdir(), 'zg-download-' + Date.now() + '.txt');
    console.log('\nTrying download...');
    const dlErr = await indexer.download(tree!.rootHash(), downloadPath, false);
    if (dlErr) {
      console.error('Download failed:', dlErr);
    } else {
      console.log('Download SUCCESS!', fs.statSync(downloadPath).size, 'bytes');
      fs.unlinkSync(downloadPath);
    }
  }
}

main().catch(console.error);