// lib/utils/zgHelpers.ts
import { ethers } from 'ethers';

/**
 * Convert string to bytes and encode for KV storage
 * @param str String to encode
 * @returns Base64 encoded string
 */
export function encodeForKV(str: string): string {
  const bytes = new TextEncoder().encode(str);
  return ethers.encodeBase64(bytes);
}

/**
 * Decode value from KV storage
 * @param encoded Base64 encoded string
 * @returns Decoded string
 */
export function decodeFromKV(encoded: string): string {
  const bytes = ethers.decodeBase64(encoded);
  return new TextDecoder().decode(bytes);
}

/**
 * Generate a unique stream ID for a user
 * @param userId User ID
 * @returns Stream ID
 */
export function generateUserStreamId(userId: string): string {
  return `user_${userId}_${Date.now()}`;
}

/**
 * Validate root hash format
 * @param rootHash Root hash to validate
 * @returns Whether valid
 */
export function isValidRootHash(rootHash: string): boolean {
  // Root hash is typically a hex string
  return /^[0-9a-fA-F]{64}$/.test(rootHash);
}

/**
 * Extract file extension from root hash or filename
 * @param input Root hash or filename
 * @returns File extension or empty string
 */
export function getFileExtension(input: string): string {
  const match = input.match(/\.([0-9a-z]+)(?:[?#]|$)/i);
  return match ? match[1] : '';
}

/**
 * Create metadata for waste receipt
 * @param userId User ID
 * @param pickupId Pickup ID
 * @param weight Weight in kg
 * @param points Points earned
 * @returns Metadata object
 */
export function createWasteReceiptMetadata(
  userId: string,
  pickupId: string,
  weight: number,
  points: number
): Record<string, unknown> {
  return {
    userId,
    pickupId,
    weight,
    points,
    timestamp: new Date().toISOString(),
    type: 'waste_receipt'
  };
}

/**
 * Create metadata for user document
 * @param userId User ID
 * @param documentType Type of document
 * @returns Metadata object
 */
export function createUserDocumentMetadata(
  userId: string,
  documentType: 'id' | 'proof_of_address' | 'certificate'
): Record<string, unknown> {
  return {
    userId,
    documentType,
    timestamp: new Date().toISOString(),
    verified: false
  };
}