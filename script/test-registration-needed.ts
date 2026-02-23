import { ethers } from 'ethers';

async function testIfRegistered() {
  console.log('🔍 Checking if address is registered with storage contract...');
  console.log('==========================================');
  
  const RPC_URL = 'https://evmrpc-testnet.0g.ai';
  const STORAGE_CONTRACT = '0x22E03a6A89B950F1c82ec5e74F8eCa321a105296';
  const YOUR_ADDRESS = '0x88A657bC1eDE380a7887b160E0ADAF7629f4f61e';
  
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  
  console.log('📄 Storage Contract:', STORAGE_CONTRACT);
  console.log('👤 Your Address:', YOUR_ADDRESS);
  console.log('\n🔎 Checking registration status...\n');
  
  // Try common view functions that might check registration
  const functionsToTry = [
    'isRegistered(address)',
    'canUpload(address)', 
    'getUser(address)',
    'hasRole(address)',
    'isWhitelisted(address)',
    'allowed(address)'
  ];
  
  let foundAny = false;
  
  for (const funcSig of functionsToTry) {
    try {
      const funcName = funcSig.split('(')[0];
      const abi = [`function ${funcSig} view returns (bool)`];
      const contract = new ethers.Contract(STORAGE_CONTRACT, abi, provider);
      
      const result = await contract[funcName](YOUR_ADDRESS);
      console.log(`✅ ${funcName}:`, result);
      foundAny = true;
      
      if (result === false) {
        console.log(`   ⚠️  You need to register first!`);
      }
    } catch (error: any) {
      // Skip if function doesn't exist
      if (!error.message.includes('function selector was not recognized')) {
        console.log(`❌ ${funcSig}: Error -`, error.message.substring(0, 50));
      }
    }
  }
  
  if (!foundAny) {
    console.log('\n⚠️ No registration check functions found.');
    console.log('This might mean:');
    console.log('   1. Registration is automatic with first deposit');
    console.log('   2. Different contract handles registration');
    console.log('   3. You need to visit 0G testnet portal');
  }
  
  console.log('\n📋 What to do next:');
  console.log('1. Visit https://docs.0g.ai/ and look for "Testnet Portal"');
  console.log('2. Connect your wallet: 0x88A657bC1eDE380a7887b160E0ADAF7629f4f61e');
  console.log('3. Look for "Register" or "Activate" button');
  console.log('4. Complete one-time registration');
  console.log('5. Then your uploads will work!');
}

testIfRegistered().catch(console.error);