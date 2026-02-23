// scripts/test-new-endpoints.ts
import { ethers } from 'ethers';

async function testNewEndpoints() {
  console.log('🔍 Testing NEW 0G endpoints...');
  
  const RPC_URL = 'https://evmrpc-testnet.0g.ai';
  const INDEXER_URL = 'https://indexer-storage-testnet-turbo.0g.ai';
  
  try {
    // Test RPC
    console.log('\n📡 Testing RPC:', RPC_URL);
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const blockNumber = await provider.getBlockNumber();
    console.log('✅ RPC working! Block number:', blockNumber);

    const balance = await provider.getBalance('YOUR_WALLET_ADDRESS');
console.log('Balance:', ethers.formatEther(balance), 'ETH');
    
    // Test Indexer (basic fetch to see if it responds)
    console.log('\n🌐 Testing Indexer:', INDEXER_URL);
    const response = await fetch(INDEXER_URL).catch(() => null);
    if (response) {
      console.log('✅ Indexer is reachable!');
    } else {
      console.log('⚠️ Indexer not responding, but this might be normal');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testNewEndpoints();