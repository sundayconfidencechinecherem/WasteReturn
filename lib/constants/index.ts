// lib/constants/index.ts
import { WasteType, WasteCategory } from '@/lib/types';

export const WASTE_CATEGORIES = [
  {
    id: 'recyclable',
    name: 'Recyclable',
    color: '#1976D2',
    icon: '♻️',
    types: ['Plastics', 'Paper', 'Glass', 'Metals']
  },
  {
    id: 'organic',
    name: 'Organic',
    color: '#2E7D32',
    icon: '🍃',
    types: ['Food Scraps', 'Yard Waste']
  },
  {
    id: 'hazardous',
    name: 'Hazardous',
    color: '#C62828',
    icon: '⚠️',
    types: ['Batteries', 'Chemicals', 'Paint']
  },
  {
    id: 'electronic',
    name: 'E-Waste',
    color: '#7B1FA2',
    icon: '📱',
    types: ['Phones', 'Laptops', 'Cables']
  },
  {
    id: 'residual',
    name: 'Residual',
    color: '#757575',
    icon: '🗑️',
    types: ['Diapers', 'Foam', 'Mixed Waste']
  }
];

// Define a type for our waste items
export interface WasteTypeItem {
  id: string;
  name: string;
  category: WasteCategory;
  basePointsPerKg: number;
  icon: string;
  sortingInstructions: string[];
  description: string;
  preparationTips: string[];
  accepted: boolean;
  requiresSpecialHandling: boolean;
  materialType?: string;
}

export const WASTE_TYPES: WasteTypeItem[] = [
  {
    id: 'pet',
    name: 'PET Plastics',
    category: 'recyclable',
    basePointsPerKg: 40,
    icon: '🧴',
    sortingInstructions: ['Remove labels', 'Rinse', 'Crush'],
    description: 'Water bottles, soda bottles, juice containers',
    preparationTips: ['Remove caps', 'Rinse thoroughly', 'Crush to save space'],
    accepted: true,
    requiresSpecialHandling: false,
    materialType: 'pet'
  },
  {
    id: 'aluminum',
    name: 'Aluminum Cans',
    category: 'recyclable',
    basePointsPerKg: 100,
    icon: '🥫',
    sortingInstructions: ['Rinse', 'Crush'],
    description: 'Soda cans, beer cans, energy drinks',
    preparationTips: ['Rinse', 'Crush'],
    accepted: true,
    requiresSpecialHandling: false,
    materialType: 'aluminum'
  },
  {
    id: 'cardboard',
    name: 'Cardboard',
    category: 'recyclable',
    basePointsPerKg: 20,
    icon: '📦',
    sortingInstructions: ['Flatten', 'Keep dry'],
    description: 'Shipping boxes, cereal boxes, packaging',
    preparationTips: ['Flatten', 'Remove tape if possible', 'Keep dry'],
    accepted: true,
    requiresSpecialHandling: false,
    materialType: 'cardboard'
  },
  {
    id: 'glass_clear',
    name: 'Clear Glass',
    category: 'recyclable',
    basePointsPerKg: 10,
    icon: '🥤',
    sortingInstructions: ['Rinse', 'Remove lids'],
    description: 'Clear bottles, jars, containers',
    preparationTips: ['Rinse', 'Remove metal lids', 'Separate by color'],
    accepted: true,
    requiresSpecialHandling: false,
    materialType: 'glass_clear'
  },
  {
    id: 'electronics',
    name: 'Electronics',
    category: 'electronic',
    basePointsPerKg: 200,
    icon: '📱',
    sortingInstructions: ['Remove batteries', 'Keep intact'],
    description: 'Phones, laptops, tablets, cables',
    preparationTips: ['Remove batteries', 'Backup data', 'Keep intact'],
    accepted: true,
    requiresSpecialHandling: true,
    materialType: 'electronics'
  }
];

export const PICKUP_TIME_WINDOWS = [
  { id: 'morning', label: 'Morning (8am - 11am)', value: 'morning' },
  { id: 'afternoon', label: 'Afternoon (2pm - 5pm)', value: 'afternoon' },
  { id: 'evening', label: 'Evening (5pm - 8pm)', value: 'evening' }
] as const;

export const SORTING_QUALITIES = [
  { id: 'gold', label: 'Gold (1.5x)', multiplier: 1.5, color: '#FFD700' },
  { id: 'silver', label: 'Silver (1.3x)', multiplier: 1.3, color: '#C0C0C0' },
  { id: 'bronze', label: 'Bronze (1.1x)', multiplier: 1.1, color: '#CD7F32' },
  { id: 'mixed', label: 'Mixed (1.0x)', multiplier: 1.0, color: '#9E9E9E' },
  { id: 'contaminated', label: 'Contaminated (0.5x)', multiplier: 0.5, color: '#D32F2F' }
] as const;