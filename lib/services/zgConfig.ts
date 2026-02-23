import { Indexer, KvClient } from '@0glabs/0g-ts-sdk';
import { JsonRpcProvider, Wallet } from 'ethers';
import { ZGStorageConfig } from '@/lib/types/zgStorage';

// Network Configuration
const ZG_CONFIG: ZGStorageConfig = {
  rpcUrl: process.env.NEXT_PUBLIC_ZG_RPC_URL || 'https://evmrpc-testnet.0g.ai',
  indexerUrl: process.env.NEXT_PUBLIC_ZG_INDEXER_URL || 'https://indexer-storage-testnet-turbo.0g.ai',
  kvUrl: process.env.NEXT_PUBLIC_ZG_KV_URL || 'http://3.101.147.150:6789',
  network: 'testnet'
};

// Flag to track if network is available
let isNetworkAvailable: boolean | null = null;
let lastNetworkCheck = 0;
const NETWORK_CHECK_INTERVAL = 60000; // Check every minute

/**
 * Check if 0G network is reachable
 */
async function checkNetworkAvailability(): Promise<boolean> {
  // Return cached result if checked recently
  if (isNetworkAvailable !== null && Date.now() - lastNetworkCheck < NETWORK_CHECK_INTERVAL) {
    return isNetworkAvailable;
  }

  try {
    // NEW WORKING ENDPOINTS from their docs
    const endpoints = [
      'https://evmrpc-testnet.0g.ai',           // New RPC
      'https://indexer-storage-testnet-turbo.0g.ai', // New Indexer
    ];

    // Test endpoints with fetch
    for (const endpoint of endpoints) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(endpoint, {
          method: 'HEAD',
          signal: controller.signal
        }).catch(() => null);
        
        clearTimeout(timeoutId);
        
        if (response) {
          isNetworkAvailable = true;
          lastNetworkCheck = Date.now();
          console.log('✅ 0G network is reachable via:', endpoint);
          return true;
        }
      } catch {
        continue;
      }
    }

    // Try RPC with ethers as fallback
    try {
      // Create a temporary provider
      const tempProvider = new JsonRpcProvider('https://evmrpc-testnet.0g.ai');
      const blockNumber = await tempProvider.getBlockNumber();
      if (blockNumber > 0) {
        isNetworkAvailable = true;
        lastNetworkCheck = Date.now();
        console.log('✅ 0G network reachable via RPC, block:', blockNumber);
        return true;
      }
    } catch (error) {
      console.log('RPC test failed:', error instanceof Error ? error.message : 'Unknown error');
    }

    isNetworkAvailable = false;
    lastNetworkCheck = Date.now();
    console.warn('⚠️ 0G network is unreachable - using demo mode');
    return false;
  } catch (error) {
    isNetworkAvailable = false;
    lastNetworkCheck = Date.now();
    return false;
  }
}

// Provider and Signer initialization
let provider: JsonRpcProvider | null = null;
let signer: Wallet | null = null;
let indexer: Indexer | null = null;
let kvClient: KvClient | null = null;

/**
 * Initialize blockchain provider and signer
 */
export const initBlockchain = (privateKey?: string) => {
  try {
    provider = new JsonRpcProvider(ZG_CONFIG.rpcUrl);
    
    const key = privateKey || process.env.ZG_PRIVATE_KEY;
    if (!key) {
      console.warn('⚠️ No private key found.');
      return { provider, signer: null };
    }
    
    signer = new Wallet(key, provider);
    return { provider, signer };
  } catch (error) {
    console.error('Failed to initialize blockchain:', error);
    return { provider: null, signer: null };
  }
};

// Initialize on module load
const blockchain = initBlockchain();

/**
 * Create a mock indexer for demo mode
 */
function createMockIndexer(): Indexer {
  return new Proxy({} as Indexer, {
    get: (target, prop) => {
      if (prop === 'upload') {
        return async () => {
          await new Promise(resolve => setTimeout(resolve, 1000));
          const mockTx = '0x' + Array.from({ length: 64 }, () => 
            Math.floor(Math.random() * 16).toString(16)).join('');
          return [mockTx, null];
        };
      }
      if (prop === 'download') {
        return async () => {
          await new Promise(resolve => setTimeout(resolve, 500));
          return null;
        };
      }
      return () => Promise.resolve([null, null]);
    }
  });
}

/**
 * Get or initialize Indexer
 */
export const getIndexer = async (): Promise<Indexer> => {
  // Check if network is available first
  const networkAvailable = await checkNetworkAvailability();
  
  if (!networkAvailable) {
    console.log('🟡 Network unavailable - returning mock indexer');
    return createMockIndexer();
  }

  if (!indexer) {
    try {
      // Use the NEW indexer URL
      const indexerUrl = process.env.NEXT_PUBLIC_ZG_INDEXER_URL || 'https://indexer-storage-testnet-turbo.0g.ai';
      console.log('🔴 Creating REAL indexer with:', indexerUrl);
      indexer = new Indexer(indexerUrl);
      console.log('✅ Real Indexer initialized');
    } catch (error) {
      console.error('Failed to create real indexer:', error);
      return createMockIndexer();
    }
  }
  return indexer;
};

/**
 * Create a mock KV client for demo mode
 */
function createMockKvClient(): KvClient {
  return new Proxy({} as KvClient, {
    get: (target, prop) => {
      if (prop === 'getValue') {
        return async () => {
          await new Promise(resolve => setTimeout(resolve, 300));
          return JSON.stringify({ 
            mock: true, 
            timestamp: Date.now(),
            message: 'Demo mode - 0G network unavailable'
          });
        };
      }
      return () => null;
    }
  });
}

/**
 * Get or initialize KV Client
 */
export const getKvClient = async (): Promise<KvClient> => {
  const networkAvailable = await checkNetworkAvailability();
  
  if (!networkAvailable) {
    return createMockKvClient();
  }

  if (!kvClient) {
    try {
      kvClient = new KvClient(ZG_CONFIG.kvUrl ?? 'http://3.101.147.150:6789');
      console.log('✅ Real KV Client initialized');
    } catch (error) {
      console.error('Failed to create real KV client:', error);
      return createMockKvClient();
    }
  }
  return kvClient;
};

/**
 * Get signer
 */
export const getSigner = (): Wallet | null => {
  if (!signer) {
    const { signer: newSigner } = initBlockchain();
    return newSigner;
  }
  return signer;
};

/**
 * Get provider
 */
export const getProvider = (): JsonRpcProvider | null => {
  if (!provider) {
    const { provider: newProvider } = initBlockchain();
    return newProvider;
  }
  return provider;
};

/**
 * Get storage configuration
 */
export const getZGConfig = (): ZGStorageConfig => {
  return ZG_CONFIG;
};

/**
 * Check if we're in demo mode
 */
export const isDemoMode = async (): Promise<boolean> => {
  const networkAvailable = await checkNetworkAvailability();
  return !process.env.ZG_PRIVATE_KEY || !networkAvailable;
};

/**
 * Get current mode description
 */
export async function getModeDescription(): Promise<string> {
  const hasKey = !!process.env.ZG_PRIVATE_KEY;
  const networkOk = await checkNetworkAvailability();
  
  if (!hasKey) return 'Demo Mode (no private key)';
  if (!networkOk) return 'Demo Mode (network unavailable)';
  return 'Real 0G Storage Mode';
}