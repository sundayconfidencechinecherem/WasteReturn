// lib/types/0g-sdk.d.ts

declare module '@0glabs/0g-ts-sdk' {
  export interface MerkleTree {
    rootHash(): string;
  }

  export interface UploadResult {
    txHash: string;
  }

  export class ZgFile {
    static fromFilePath(path: string): Promise<ZgFile>;
    merkleTree(): Promise<[MerkleTree | null, string | null]>;
    close(): Promise<void>;
  }

  export class Indexer {
    constructor(url: string);
    upload(file: ZgFile, rpcUrl: string, signer: unknown): Promise<[string, string | null]>;
    download(rootHash: string, outputPath: string, verify: boolean): Promise<string | null>;
  }

  export class KvClient {
    constructor(url: string);
    getValue(streamId: string, key: string): Promise<unknown>;
  }

  export class Batcher {
    constructor(numNodes: number, nodes: unknown[], flowContract: unknown, rpcUrl: string);
    streamDataBuilder: {
      set(streamId: string, key: Uint8Array, value: Uint8Array): void;
    };
    exec(): Promise<[string, string | null]>;
  }
}