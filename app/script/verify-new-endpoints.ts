import { ethers } from 'ethers';

async function verifyEndpoints() {
  console.log('🔍 Verifying NEW 0G endpoints...');
  console.log('=====================================');
  
  const RPC_URL = 'https://evmrpc-testnet.0g.ai';
  const INDEXER_URL = 'https://indexer-storage-testnet-turbo.0g.ai';
  
  try {
    // Test RPC
    console.log('\n📡 Testing RPC:', RPC_URL);
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    
    // Get network info
    const network = await provider.getNetwork();
    console.log('✅ RPC Connected! Chain ID:', network.chainId.toString());
    
    // Get block number
    const blockNumber = await provider.getBlockNumber();
    console.log('✅ Latest Block:', blockNumber);
    
    if (blockNumber > 0) {
      console.log('✅ RPC is fully operational!');
    }
    
    // Test Indexer (basic connectivity)
    console.log('\n🌐 Testing Indexer:', INDEXER_URL);
    try {
      // Use AbortController for timeout instead of timeout option
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(INDEXER_URL, { 
        method: 'HEAD',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response) {
        console.log('✅ Indexer is reachable! Status:', response.status);
      } else {
        console.log('⚠️ Indexer not responding');
      }
    } catch (fetchError) {
      const errorMessage = fetchError instanceof Error ? fetchError.message : String(fetchError);
      console.log('⚠️ Indexer test:', errorMessage);
      console.log('   (This is normal if the indexer requires authentication)');
    }
    
    // Test balance with a known address (optional)
    console.log('\n💰 Testing balance check...');
    try {
      // This is a zero address - just testing RPC functionality
      const balance = await provider.getBalance('0x0000000000000000000000000000000000000000');
      console.log('✅ Balance check works:', ethers.formatEther(balance), 'ETH');
    } catch (balanceError) {
      const errorMessage = balanceError instanceof Error ? balanceError.message : String(balanceError);
      console.log('⚠️ Balance test:', errorMessage);
    }
    
    console.log('\n=====================================');
    console.log('✅✅✅ TEST COMPLETE');
    console.log('=====================================');
    console.log('RPC URL:', RPC_URL);
    console.log('Indexer URL:', INDEXER_URL);
    console.log('\nIf RPC connected successfully, your endpoints are working!');
    console.log('Update your .env.local with these URLs:');
    console.log('NEXT_PUBLIC_ZG_RPC_URL=' + RPC_URL);
    console.log('NEXT_PUBLIC_ZG_INDEXER_URL=' + INDEXER_URL);
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('\n❌ Connection failed:', errorMessage);
    console.error('This suggests the 0G testnet is currently down');
  }
}

// Run the test
verifyEndpoints().catch(console.error);