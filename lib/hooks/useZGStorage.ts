// lib/hooks/useZGStorage.ts
'use client';

import { useState, useCallback } from 'react';
import { uploadFileBrowser, downloadFileBrowser } from '@/lib/services/zgStorage.browser';
import { ZGUploadResult } from '@/lib/types/zgStorage';

interface UseZGStorageReturn {
  upload: (file: File) => Promise<ZGUploadResult>;
  download: (rootHash: string) => Promise<Blob | null>;
  isUploading: boolean;
  isDownloading: boolean;
  uploadProgress: number;
  downloadProgress: number;
  error: string | null;
}

export function useZGStorage(): UseZGStorageReturn {
  const [isUploading, setIsUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(async (file: File): Promise<ZGUploadResult> => {
    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      const result = await uploadFileBrowser(file);

      clearInterval(progressInterval);
      setUploadProgress(100);
      
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      throw err;
    } finally {
      setIsUploading(false);
    }
  }, []);

  const download = useCallback(async (rootHash: string): Promise<Blob | null> => {
    setIsDownloading(true);
    setDownloadProgress(0);
    setError(null);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      const result = await downloadFileBrowser(rootHash);

      clearInterval(progressInterval);
      setDownloadProgress(100);
      
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download failed');
      throw err;
    } finally {
      setIsDownloading(false);
    }
  }, []);

  return {
    upload,
    download,
    isUploading,
    isDownloading,
    uploadProgress,
    downloadProgress,
    error
  };
}