// lib/types/index.ts

export type UserRole = 'user' | 'driver' | 'admin' | 'estate_manager';

export interface User {
  id: string;
  phoneNumber: string;
  fullName: string;
  email?: string;
  role: UserRole;
  householdId?: string;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Household {
  id: string;
  address: string;
  latitude?: number;
  longitude?: number;
  qrCode: string;
  members: User[];
  preferences: {
    preferredPickupTime?: string;
    contactMethod: 'sms' | 'whatsapp' | 'both';
    notes?: string;
  };
  stats: {
    totalRecycled: number;
    sortingAccuracy: number;
    pickupsCompleted: number;
  };
}

export type WasteCategory = 'recyclable' | 'organic' | 'hazardous' | 'residual' | 'electronic';

export type MaterialType = 
  | 'pet' | 'hdpe' | 'ldpe' | 'pp' | 'ps'
  | 'aluminum' | 'tin' | 'steel' | 'copper'
  | 'cardboard' | 'office_paper' | 'newspaper' | 'mixed_paper'
  | 'glass_clear' | 'glass_colored'
  | 'electronics' | 'batteries'
  | 'textiles' | 'organic_food' | 'organic_yard';

export type SortingQuality = 'gold' | 'silver' | 'bronze' | 'mixed' | 'contaminated';

export interface WasteType {
  id: string;
  name: string;
  category: WasteCategory;
  materialType?: MaterialType;
  basePointsPerKg: number;
  icon: string;
  description: string;
  sortingInstructions: string[];
  preparationTips: string[];
  accepted: boolean;
  requiresSpecialHandling: boolean;
}

export interface WasteTransaction {
  id: string;
  userId: string;
  driverId?: string;
  dropoffCenterId?: string;
  wasteTypeId: string;
  weight: number;
  basePoints: number;
  sortingQuality: SortingQuality;
  qualityMultiplier: number;
  cleanlinessFactor: number;
  loyaltyBonus: number;
  totalPoints: number;
  photoEvidence?: string[];
  notes?: string;
  createdAt: Date;
}

export type PickupStatus = 
  | 'pending' | 'assigned' | 'en_route' | 'arrived' 
  | 'completed' | 'cancelled' | 'rescheduled';

export type PickupTimeWindow = 'morning' | 'afternoon' | 'evening';

export interface PickupRequest {
  id: string;
  userId: string;
  householdId: string;
  scheduledDate: Date;
  timeWindow: PickupTimeWindow;
  wasteTypes: Array<{
    wasteTypeId: string;
    estimatedWeight: number;
  }>;
  status: PickupStatus;
  driverId?: string;
  estimatedArrival?: Date;
  actualArrival?: Date;
  completionTime?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PointsLedger {
  id: string;
  userId: string;
  transactionId?: string;
  amount: number;
  type: 'credit' | 'debit';
  reason: 'pickup' | 'dropoff' | 'bonus' | 'redemption' | 'cashout' | 'referral';
  balance: number;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  category: 'cash' | 'bill_payment' | 'gift_card' | 'merchandise' | 'charity';
  imageUrl?: string;
  available: boolean;
  expiresAt?: Date;
}

export const SORTING_QUALITY_MULTIPLIERS: Record<SortingQuality, number> = {
  gold: 1.5,
  silver: 1.3,
  bronze: 1.1,
  mixed: 1.0,
  contaminated: 0.5
};

export const POINTS_CONVERSION_RATE = 2; // 2 points = ₦1