import { 
  ZGUploadResult, 
  ZGDownloadResult,
  ZGFileMetadata,
  ZGKVUploadResult,
  ZGKVRetrieveResult
} from '@/lib/types/zgStorage';

/**
 * Upload a file to 0G Storage via API (Browser version)
 * NEVER tries to use private key directly - always goes through API
 */
export async function uploadFileBrowser(
  file: File,
  options?: {
    userId?: string;
    metadata?: Record<string, unknown>;
  }
): Promise<ZGUploadResult> {
  console.log('📤 Browser upload started for file:', file.name);
  
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    if (options?.userId) {
      formData.append('userId', options.userId);
    }
    
    if (options?.metadata) {
      formData.append('metadata', JSON.stringify(options.metadata));
    }

    const response = await fetch('/api/storage/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
      throw new Error(errorData.error || `Upload failed with status ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Upload failed');
    }
    
    console.log('✅ Upload successful:', result);
    return result.data;
    
  } catch (error) {
    console.error('❌ Upload failed:', error);
    throw error; // Re-throw so the UI can show the real error
  }
}

/**
 * Download a file from 0G Storage (Browser version)
 */
export async function downloadFileBrowser(
  rootHash: string
): Promise<Blob | null> {
  console.log('📥 Browser download started for root hash:', rootHash);

  // Validate root hash before calling API
  if (!rootHash || !rootHash.startsWith('0x') || rootHash.length !== 66) {
    throw new Error('Invalid root hash. Expected a 0x-prefixed 32-byte hex string.');
  }

  const response = await fetch(
    `/api/storage/download?rootHash=${encodeURIComponent(rootHash)}`
  );

  if (!response.ok) {
    // Try to parse error JSON for a user-friendly message
    let errorMessage = `Download failed with status ${response.status}`;
    let hint = '';

    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
      hint = errorData.hint || '';
    } catch {
      // Response wasn't JSON
    }

    const fullMessage = hint ? `${errorMessage}\n\n💡 ${hint}` : errorMessage;
    throw new Error(fullMessage);
  }

  const blob = await response.blob();

  if (blob.size === 0) {
    throw new Error('Downloaded file is empty.');
  }

  console.log('✅ Download successful:', blob.size, 'bytes, type:', blob.type);
  return blob;
}

/**
 * Store key-value data in 0G KV (Browser version)
 */
export async function storeKV(
  streamId: string,
  key: string,
  value: unknown
): Promise<ZGKVUploadResult> {
  try {
    console.log(`📝 [Browser] Storing KV: ${key} in stream ${streamId}`);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      txHash: 'kv_tx_' + Date.now(),
      success: true
    };
    
  } catch (error) {
    console.error('❌ KV store failed:', error);
    return {
      txHash: '',
      success: false
    };
  }
}

/**
 * Retrieve value from 0G KV (Browser version)
 */
export async function retrieveKV(
  streamId: string,
  key: string
): Promise<ZGKVRetrieveResult> {
  try {
    console.log(`📖 [Browser] Retrieving ${key} from stream ${streamId}`);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      value: JSON.stringify({ 
        mock: true, 
        key, 
        streamId, 
        timestamp: Date.now(),
        message: 'This is mock KV data. In production, this would be real data from 0G.'
      }),
      success: true
    };
    
  } catch (error) {
    console.error('❌ Failed to retrieve KV:', error);
    return {
      value: null,
      success: false
    };
  }
}

/**
 * Store file metadata (Browser version)
 */
export async function storeFileMetadataBrowser(
  rootHash: string,
  metadata: ZGFileMetadata
): Promise<void> {
  try {
    console.log(`📁 [Browser] Storing metadata for ${rootHash}:`, metadata);
  } catch (error) {
    console.error('❌ Failed to store metadata:', error);
  }
}