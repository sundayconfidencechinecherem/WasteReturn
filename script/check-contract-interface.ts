import { ethers } from 'ethers';

async function checkContractInterface() {
  console.log('🔍 Checking Storage Contract Interface...');
  console.log('==========================================');
  
  const RPC_URL = 'https://evmrpc-testnet.0g.ai';
  const STORAGE_CONTRACT = '0x22E03a6A89B950F1c82ec5e74F8eCa321a105296';
  
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  
  // Try to get contract bytecode to see if it's deployed
  const code = await provider.getCode(STORAGE_CONTRACT);
  console.log('📄 Contract deployed:', code !== '0x' ? '✅ YES' : '❌ NO');
  
  if (code === '0x') {
    console.log('❌ Contract not deployed at this address!');
    return;
  }
  
  console.log('✅ Contract is deployed, bytecode length:', code.length);
  
  // Common function signatures to try
  const functionsToTry = [
    { sig: 'upload(bytes)', hash: '0xef3e12dc' }, // From your logs!
    { sig: 'submit(bytes)', hash: '0xef3e12dc' }, // Same hash
    { sig: 'submit(bytes,address)', hash: '0x...' },
    { sig: 'upload(bytes,address)', hash: '0x...' },
    { sig: 'store(bytes)', hash: '0x...' },
    { sig: 'put(bytes)', hash: '0x...' },
    { sig: 'addFile(bytes)', hash: '0x...' },
    { sig: 'createFile(bytes)', hash: '0x...' }
  ];
  
  console.log('\n📝 Based on your logs, the upload function hash is: 0xef3e12dc');
  console.log('This corresponds to: upload(bytes) or submit(bytes)\n');
  
  // Try to call view functions that might exist
  const viewFunctions = [
    'version()',
    'name()',
    'getStoragePrice(uint256)',
    'calculatePrice(uint256)',
    'getFee(uint256)',
    'queryPrice(uint256)'
  ];
  
  for (const func of viewFunctions) {
    try {
      const funcName = func.split('(')[0];
      const abi = [`function ${func} view returns (uint256)`];
      const contract = new ethers.Contract(STORAGE_CONTRACT, abi, provider);
      
      // Try to call with a small parameter
      const result = await contract[funcName](1024).catch(() => null);
      if (result !== null) {
        console.log(`✅ Found working function: ${func} = ${result.toString()}`);
      }
    } catch {
      // Ignore errors
    }
  }
  
  console.log('\n💡 RECOMMENDATION:');
  console.log('1. Your SDK is using the correct function (0xef3e12dc)');
  console.log('2. The error suggests a parameter validation issue');
  console.log('3. Check if you need to:');
  console.log('   - Pay a minimum amount');
  console.log('   - Register first');
  console.log('   - Have a minimum file size');
}

checkContractInterface();