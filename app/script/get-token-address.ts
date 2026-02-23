import { ethers } from 'ethers';

async function getTokenAddress() {
  const RPC_URL = 'https://evmrpc-testnet.0g.ai';
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  
  // Common storage contract from your logs
  const storageContract = '0x22E03a6A89B950F1c82ec5e74F8eCa321a105296';
  
  console.log('🔍 Attempting to find token address...');
  console.log('Storage Contract:', storageContract);
  
  try {
    // Try to get the token address from the storage contract
    // This is a common pattern - many storage contracts have a token() method
    const storageAbi = [
      'function token() view returns (address)',
      'function flow() view returns (address)'
    ];
    
    const contract = new ethers.Contract(storageContract, storageAbi, provider);
    
    try {
      const tokenAddress = await contract.token();
      console.log('✅ Token address found:', tokenAddress);
    } catch {
      console.log('⚠️ No token() method, trying flow()...');
      const flowAddress = await contract.flow();
      console.log('✅ Flow address found:', flowAddress);
    }
    
  } catch (error) {
    console.log('❌ Could not auto-detect token address');
    console.log('Please check 0G documentation for the correct testnet token address');
  }
}

getTokenAddress();