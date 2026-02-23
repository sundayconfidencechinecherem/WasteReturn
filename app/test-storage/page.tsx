'use client';

import { StorageTest } from '@/components/ui/StorageTest';

export default function TestStoragePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">0G Storage Integration Test</h1>
      <p className="text-gray-600 mb-8">Testing with your private key</p>
      <StorageTest />
    </div>
  );
}