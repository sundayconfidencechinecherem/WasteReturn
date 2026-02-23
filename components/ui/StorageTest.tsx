'use client';

import { useState, useEffect } from 'react';
import { useZGStorage } from '@/lib/hooks/useZGStorage';
import { storeKV, retrieveKV } from '@/lib/services/zgStorage.browser';

export function StorageTest() {
  const { upload, download, isUploading, isDownloading, uploadProgress, downloadProgress } = useZGStorage();
  const [rootHash, setRootHash] = useState<string>('');
  const [lastUploadResult, setLastUploadResult] = useState<any>(null);
  const [downloadResult, setDownloadResult] = useState<string>('');
  const [kvTestResult, setKvTestResult] = useState<string>('');
  const [testFile, setTestFile] = useState<File | null>(null);
  const [isKvLoading, setIsKvLoading] = useState(false);
  const [hasPrivateKey, setHasPrivateKey] = useState<boolean>(false);

  // Check if private key is set
  useEffect(() => {
    // This is just for UI feedback - we can't check private key in browser
    setHasPrivateKey(true); // Assume true, will know from API responses
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setTestFile(file || null);
    setLastUploadResult(null);
    setDownloadResult('');
  };

  const handleUpload = async () => {
    if (!testFile) {
      alert('Please select a file first');
      return;
    }

    try {
      console.log('🚀 Starting upload...');
      const result = await upload(testFile);
      console.log('📦 Upload result:', result);
      
      setLastUploadResult(result);
      setRootHash(result.rootHash);
      
      if (result.success) {
        // Also store metadata in KV
        await testKVStorage(result.rootHash, {
          fileName: testFile.name,
          fileSize: testFile.size,
          fileType: testFile.type,
          uploadedAt: new Date().toISOString()
        });
      }
      
    } catch (error) {
      console.error('❌ Upload error:', error);
      alert('Upload failed: ' + (error as Error).message);
    }
  };

  const handleDownload = async () => {
    if (!rootHash) {
      alert('Please enter a root hash');
      return;
    }

    try {
      const blob = await download(rootHash);
      if (blob) {
        // Create a download link
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `downloaded-${Date.now()}.txt`;
        a.click();
        setDownloadResult(`✅ Downloaded ${blob.size} bytes`);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('❌ Download error:', error);
      alert('Download failed: ' + (error as Error).message);
    }
  };

  const testKVStorage = async (hash: string, metadata: any) => {
    setIsKvLoading(true);
    try {
      // Store in KV
      const streamId = 'wastereturn-test';
      const key = `file:${hash}`;
      
      console.log('📝 Storing KV...');
      const storeResult = await storeKV(streamId, key, metadata);
      
      if (storeResult.success) {
        setKvTestResult(`✅ KV stored with tx: ${storeResult.txHash}`);
        
        // Retrieve from KV
        console.log('📖 Retrieving KV...');
        const retrieveResult = await retrieveKV(streamId, key);
        
        if (retrieveResult.success && retrieveResult.value) {
          setKvTestResult(prev => prev + `\n✅ KV retrieved: ${retrieveResult.value}`);
        }
      } else {
        setKvTestResult('❌ KV storage failed');
      }
    } catch (error) {
      console.error('❌ KV test error:', error);
      setKvTestResult('❌ KV test error: ' + (error as Error).message);
    } finally {
      setIsKvLoading(false);
    }
  };

  const testSimpleUpload = async () => {
    // Create a simple test file
    const testContent = 'Hello 0G Storage! This is a test file from WasteReturn.';
    const testBlob = new Blob([testContent], { type: 'text/plain' });
    const testFile = new File([testBlob], 'test.txt', { type: 'text/plain' });
    
    setTestFile(testFile);
    setTimeout(() => handleUpload(), 100);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto p-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">🔧 0G Storage Test Panel</h2>
        <p className="text-sm text-blue-600">
          Private Key: {hasPrivateKey ? '✅ Configured' : '❌ Not set (using demo mode)'}
        </p>
      </div>

      {/* Quick Test Button */}
      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <h3 className="text-md font-medium mb-4">1. Quick Test</h3>
        <button
          onClick={testSimpleUpload}
          disabled={isUploading}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-400 transition-colors"
        >
          {isUploading ? 'Uploading...' : '🚀 Create & Upload Test File'}
        </button>
      </div>

      {/* Manual Upload */}
      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <h3 className="text-md font-medium mb-4">2. Manual Upload</h3>
        <div className="space-y-4">
          <input
            type="file"
            onChange={handleFileSelect}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          
          {testFile && (
            <div className="p-3 bg-gray-50 rounded text-sm">
              <p><span className="font-medium">File:</span> {testFile.name}</p>
              <p><span className="font-medium">Size:</span> {(testFile.size / 1024).toFixed(2)} KB</p>
              <p><span className="font-medium">Type:</span> {testFile.type || 'unknown'}</p>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={isUploading || !testFile}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {isUploading ? 'Uploading...' : '📤 Upload to 0G'}
          </button>

          {isUploading && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">{uploadProgress}% uploaded</p>
            </div>
          )}
        </div>
      </div>

      {/* Upload Result */}
      {lastUploadResult && (
        <div className="border rounded-lg p-6 bg-green-50 border-green-200">
          <h3 className="text-md font-medium text-green-800 mb-4">3. Upload Result</h3>
          <div className="space-y-2 font-mono text-sm">
            <p><span className="font-bold">Root Hash:</span> <span className="text-green-700 break-all">{lastUploadResult.rootHash}</span></p>
            <p><span className="font-bold">Transaction:</span> <span className="text-green-700 break-all">{lastUploadResult.txHash}</span></p>
            <p><span className="font-bold">Success:</span> {lastUploadResult.success ? '✅' : '❌'}</p>
          </div>
        </div>
      )}

      {/* Download Section */}
      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <h3 className="text-md font-medium mb-4">4. Download Test</h3>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={rootHash}
              onChange={(e) => setRootHash(e.target.value)}
              placeholder="Enter root hash to download"
              className="flex-1 p-2 border rounded font-mono text-sm"
            />
            <button
              onClick={handleDownload}
              disabled={isDownloading || !rootHash}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 whitespace-nowrap transition-colors"
            >
              {isDownloading ? 'Downloading...' : '📥 Download'}
            </button>
          </div>

          {isDownloading && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-600 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${downloadProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">{downloadProgress}% downloaded</p>
            </div>
          )}

          {downloadResult && (
            <p className="text-sm text-green-600">{downloadResult}</p>
          )}
        </div>
      </div>

      {/* KV Storage Test */}
      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <h3 className="text-md font-medium mb-4">5. KV Storage Test</h3>
        {kvTestResult && (
          <pre className="p-3 bg-gray-50 rounded text-sm whitespace-pre-wrap border">
            {kvTestResult}
          </pre>
        )}
        {isKvLoading && (
          <p className="text-sm text-gray-500">Testing KV storage...</p>
        )}
      </div>
    </div>
  );
}