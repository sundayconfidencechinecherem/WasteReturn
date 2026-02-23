import { ethers } from 'ethers';

async function getTokenAddress() {
  console.log('🔍 Attempting to find 0G token address...');
  console.log('==========================================');
  
  const RPC_URL = 'https://evmrpc-testnet.0g.ai';
  const STORAGE_CONTRACT = '0x22E03a6A89B950F1c82ec5e74F8eCa321a105296';
  
  try {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    
    // Test RPC connection first
    const network = await provider.getNetwork();
    console.log('✅ Connected to chain ID:', network.chainId.toString());
    
    console.log('\n📄 Storage Contract:', STORAGE_CONTRACT);
    
    // Try common ERC20 token interfaces
    const commonInterfaces = [
      {
        name: 'token()',
        abi: ['function token() view returns (address)']
      },
      {
        name: 'flow()', 
        abi: ['function flow() view returns (address)']
      },
      {
        name: 'a0giToken()',
        abi: ['function a0giToken() view returns (address)']
      },
      {
        name: 'paymentToken()',
        abi: ['function paymentToken() view returns (address)']
      }
    ];
    
    for (const { name, abi } of commonInterfaces) {
      try {
        console.log(`\n🔍 Trying ${name}...`);
        const contract = new ethers.Contract(STORAGE_CONTRACT, abi, provider);
        const tokenAddress = await contract[name.split('(')[0]]();
        
        if (tokenAddress && tokenAddress !== '0x0000000000000000000000000000000000000000') {
          console.log(`✅ Found token address via ${name}:`, tokenAddress);
          
          // Try to get token info
          try {
            const tokenAbi = [
              'function symbol() view returns (string)',
              'function name() view returns (string)',
              'function decimals() view returns (uint8)'
            ];
            const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);
            
            const symbol = await tokenContract.symbol().catch(() => 'Unknown');
            const name_ = await tokenContract.name().catch(() => 'Unknown');
            const decimals = await tokenContract.decimals().catch(() => 18);
            
            console.log('   Token Symbol:', symbol);
            console.log('   Token Name:', name_);
            console.log('   Decimals:', decimals);
          } catch {
            console.log('   (Basic token info not available)');
          }
        }
      } catch (error) {
        // Silent fail for methods that don't exist
      }
    }
    
    console.log('\n⚠️ If no token address found above, you may need:');
    console.log('   1. Check 0G documentation for the correct testnet token');
    console.log('   2. Ask in 0G Discord/Telegram');
    console.log('   3. The contract might accept native ETH (already have 0.1 ETH)');
    
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : String(error));
  }
}

getTokenAddress();