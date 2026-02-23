import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function checkContractFunctions() {
  const RPC_URL = 'https://evmrpc-testnet.0g.ai';
  const STORAGE_CONTRACT = '0x22E03a6A89B950F1c82ec5e74F8eCa321a105296';
  const MINE_CONTRACT = '0x00A9E9604b0538e06b268Fb297Df333337f9593b';
  
  const privateKey = process.env.ZG_PRIVATE_KEY;
  if (!privateKey) throw new Error('No private key');
  
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(privateKey, provider);
  
  console.log('🔍 Checking contract functions...\n');
  
  // Try to find registration function signatures
  const functionsToTry = [
    'register()',
    'registerUser()', 
    'activate()',
    'deposit()',
    'stake()',
    'initialize()'
  ];
  
  for (const func of functionsToTry) {
    try {
      const funcName = func.split('(')[0];
      const abi = [`function ${func}`];
      const contract = new ethers.Contract(STORAGE_CONTRACT, abi, wallet);
      
      console.log(`📝 Trying ${func} on storage contract...`);
      const tx = await contract[funcName]();
      console.log(`✅ Success! Transaction: ${tx.hash}`);
      await tx.wait();
      console.log(`✅ Confirmed! Your address is now registered!\n`);
      return;
    } catch (error: any) {
      console.log(`❌ ${func} failed:`, error.message.substring(0, 50));
    }
  }
  
  // Try mine contract
  console.log('\n📝 Trying mine contract...');
  for (const func of functionsToTry) {
    try {
      const funcName = func.split('(')[0];
      const abi = [`function ${func}`];
      const contract = new ethers.Contract(MINE_CONTRACT, abi, wallet);
      
      console.log(`📝 Trying ${func} on mine contract...`);
      const tx = await contract[funcName]();
      console.log(`✅ Success! Transaction: ${tx.hash}`);
      await tx.wait();
      console.log(`✅ Confirmed! Your address is now registered!\n`);
      return;
    } catch (error: any) {
      console.log(`❌ ${func} failed:`, error.message.substring(0, 50));
    }
  }
}

checkContractFunctions();