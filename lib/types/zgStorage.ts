/**
 * Types for WasteReturn 0G Storage
 * Save this as: lib/types/zgStorage.ts
 */

// ─── Core storage types (used by zgStorage.ts) ────────────────────────────────

export interface ZGRecord {
  type: string;
  id: string;
  data: unknown;
  savedAt: string;
}

export interface SaveResult {
  success: boolean;
  txHash: string;
  error?: string;
}

export interface LoadResult<T = unknown> {
  success: boolean;
  record?: ZGRecord & { data: T };
  error?: string;
}

// ─── Legacy / compat types (keeps zgStorage.browser.ts + zgConfig.ts happy) ───

export interface ZGUploadResult {
  success: boolean;
  rootHash: string;
  txHash: string;
  error?: string;
}

export interface ZGDownloadResult {
  success: boolean;
  path?: string;
  buffer?: Buffer;
  fileName?: string;
  mimeType?: string;
  error?: string;
}

export interface ZGUploadOptions {
  filePath: string;
  userId?: string;
  metadata?: Record<string, unknown>;
}

export interface ZGFileMetadata {
  fileName: string;
  fileSize: number;
  mimeType?: string;
  uploadedAt: string;
  userId?: string;
}

export interface ZGKVUploadResult {
  success: boolean;
  txHash: string;
  error?: string;
}

export interface ZGKVRetrieveResult {
  success: boolean;
  value: string | null;
  error?: string;
}

export interface ZGStorageConfig {
  rpcUrl: string;
  indexerUrl: string;
  kvUrl?: string;
  network?: string;
  privateKey?: string;
  flowContractAddress?: string;
}