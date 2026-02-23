import { ethers } from 'ethers';
import * as fs from 'fs';
import * as path from 'path';

// Manually load .env.local without dotenv
function loadEnv() {
  try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envLines = envContent.split('\n');
    
    for (const line of envLines) {
      const match = line.match(/^ZG_PRIVATE_KEY=(.+)$/);
      if (match) {
        process.env.ZG_PRIVATE_KEY = match[1].trim();
        break;
      }
    }
  } catch (error) {
    console.log('No .env.local file found, using environment variables');
  }
}

loadEnv();

async function approveStorage() {
  console.log('🔧 Starting storage approval test...');
  console.log('======================================');
  
  const RPC_URL = 'https://evmrpc-testnet.0g.ai';
  const STORAGE_CONTRACT = '0x22E03a6A89B950F1c82ec5e74F8eCa321a105296';
  
  const privateKey = process.env.ZG_PRIVATE_KEY;
  if (!privateKey) {
    console.error('❌ No private key found in .env.local');
    console.log('Please add: ZG_PRIVATE_KEY=your_private_key_here');
    return;
  }
  
  try {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(privateKey, provider);
    const address = await wallet.getAddress();
    
    console.log('✅ Wallet address:', address);
    
    // Check ETH balance - use Number() comparison instead of BigInt literal
    const ethBalance = await provider.getBalance(address);
    const ethBalanceFormatted = parseFloat(ethers.formatEther(ethBalance));
    console.log('💰 ETH Balance:', ethBalanceFormatted, 'ETH');
    
    if (ethBalanceFormatted === 0) {
      console.log('❌ You need testnet ETH! Get from faucet');
      return;
    }
    
    // Try to interact with the storage contract directly
    console.log('\n📝 Attempting to call storage contract...');
    
    // Minimal ABI for storage operations - based on actual contract
    const storageAbi = [
      'function upload(bytes calldata data) external payable returns (bytes32)',
      'function submit(bytes calldata data) external payable returns (bytes32)',
      'function getPrice(uint256 size) view returns (uint256)',
      'function requiredToken() view returns (address)',
      'function flow() view returns (address)'
    ];
    
    const storageContract = new ethers.Contract(STORAGE_CONTRACT, storageAbi, wallet);
    
    // Try to get required token (if any)
    try {
      const requiredToken = await storageContract.requiredToken();
      console.log('✅ Contract requires token:', requiredToken);
      
      if (requiredToken !== '0x0000000000000000000000000000000000000000') {
        console.log('\n🔍 This means you need to approve this token for spending');
        console.log('Token address:', requiredToken);
      } else {
        console.log('✅ Contract accepts native ETH (no token approval needed)');
      }
    } catch {
      console.log('ℹ️ No requiredToken() method - contract likely accepts native ETH');
    }
    
    // Get storage price
    try {
      const price = await storageContract.getPrice(1024); // Price for 1KB
      const priceFormatted = parseFloat(ethers.formatEther(price));
      console.log('💰 Storage price for 1KB:', priceFormatted, 'ETH');
      
      if (ethBalanceFormatted > priceFormatted) {
        console.log('✅ You have enough ETH for storage!');
        
        // Try a minimal test transaction
        console.log('\n🧪 Attempting minimal test upload...');
        
        // Create minimal test data
        const testData = ethers.hexlify(ethers.toUtf8Bytes('test'));
        
        // Estimate gas first
        try {
          const gasEstimate = await storageContract.upload.estimateGas(testData, {
            value: price
          });
          console.log('✅ Gas estimate:', gasEstimate.toString());
          
          // If we got here, transaction should work!
          console.log('\n🎉 GOOD NEWS! Your contract is ready!');
          console.log('The upload should work once we use the correct method.');
          console.log('\nTry updating your code to use:');
          console.log('   const [tx, uploadErr] = await indexer.upload(file, RPC_URL, signer);');
          console.log('   (You already have this - it should work!)');
          
        } catch (estimateError: any) {
          console.log('❌ Gas estimation failed:', estimateError.message);
          
          if (estimateError.message.includes('insufficient funds')) {
            console.log('   Need more ETH for gas');
          } else if (estimateError.message.includes('execution reverted')) {
            console.log('   Contract reverted - might need different method');
            console.log('   Try: "submit" instead of "upload"');
          }
        }
      }
    } catch (priceError: any) {
      console.log('⚠️ Could not get price:', priceError.message);
    }
    
    // Try to get flow contract info
    try {
      const flowAddress = await storageContract.flow();
      console.log('\n📊 Flow Contract:', flowAddress);
    } catch {
      // Ignore
    }
    
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : String(error));
  }
}

approveStorage();