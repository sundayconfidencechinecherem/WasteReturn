import { ethers } from 'ethers';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

async function testSimpleUpload() {
  console.log('🔧 Simple 0G Upload Test');
  console.log('========================');
  
  const RPC_URL = 'https://evmrpc-testnet.0g.ai';
  const privateKey = process.env.ZG_PRIVATE_KEY;
  
  if (!privateKey) {
    console.error('❌ No private key found');
    return;
  }
  
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(privateKey, provider);
  
  console.log('✅ Wallet:', await wallet.getAddress());
  
  // Check balance
  const balance = await provider.getBalance(await wallet.getAddress());
  console.log('💰 Balance:', ethers.formatEther(balance), 'ETH');
  
  // Create a tiny test file
  const testContent = 'test';
  const testPath = path.join(os.tmpdir(), 'test-upload.txt');
  fs.writeFileSync(testPath, testContent);
  console.log('📄 Test file created:', testPath, 'size:', testContent.length, 'bytes');
  
  // Try direct contract interaction
  const storageContract = '0x22E03a6A89B950F1c82ec5e74F8eCa321a105296';
  
  // This is the function signature from your logs: 0xef3e12dc = upload(bytes)
  const uploadData = '0xef3e12dc' + 
    ethers.zeroPadValue(ethers.toUtf8Bytes(testContent), 32).slice(2);
  
  console.log('\n📤 Attempting direct contract call...');
  console.log('Contract:', storageContract);
  console.log('Data:', uploadData);
  
  try {
    const tx = await wallet.sendTransaction({
      to: storageContract,
      data: uploadData,
      gasLimit: 500000
    });
    
    console.log('⏳ Transaction sent:', tx.hash);
    console.log('⏳ Waiting for confirmation...');
    
    const receipt = await tx.wait();
    console.log('✅ Transaction confirmed!');
    console.log('📦 Receipt:', receipt);
    
  } catch (error: any) {
    console.error('❌ Transaction failed:', error.message);
    if (error.transaction) {
      console.log('Transaction:', error.transaction);
    }
    if (error.receipt) {
      console.log('Receipt:', error.receipt);
    }
  }
  
  // Clean up
  fs.unlinkSync(testPath);
}

testSimpleUpload();