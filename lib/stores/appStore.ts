/**
 * lib/stores/appStore.ts
 * Central state store for WasteReturn app
 * Uses 0G storage as the database, Zustand as the client state layer
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;          // wallet address
  name: string;
  phone: string;
  email?: string;
  role: 'user' | 'driver' | 'admin';
  points: number;
  level: string;
  streak: number;
  rank: number;
  stats: {
    totalRecycled: number;
    treesSaved: number;
    waterSaved: number;
    co2Prevented: number;
    pickupsCompleted: number;
    thisMonth: number;
  };
  achievements: Achievement[];
  zgTxHash?: string;   // 0G storage hash for this user record
  createdAt: string;
}

export interface Achievement {
  id: string;
  name: string;
  icon: string;
  progress: number;
  target: number;
  completed: boolean;
}

export interface PickupRequest {
  id: string;
  userId: string;
  address: string;
  scheduledDate: string;
  timeWindow: 'morning' | 'afternoon' | 'evening';
  status: 'pending' | 'assigned' | 'en_route' | 'completed' | 'cancelled';
  wasteTypes: { wasteTypeId: string; estimatedWeight: number }[];
  totalWeight?: number;
  pointsEarned?: number;
  driverId?: string;
  driver?: { name: string; phone: string; eta?: string };
  notes?: string;
  zgTxHash?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Driver {
  id: string;          // wallet address
  name: string;
  phone: string;
  status: 'online' | 'offline' | 'on_pickup';
  rating: number;
  totalPickups: number;
  todayPickups: number;
  todayEarnings: number;
  zgTxHash?: string;
  createdAt: string;
}

export interface AppStore {
  // Auth
  currentUser: User | null;
  currentDriver: Driver | null;
  isAuthenticated: boolean;

  // Data
  pickups: PickupRequest[];
  allUsers: User[];
  allDrivers: Driver[];

  // UI state
  isLoading: boolean;
  error: string | null;

  // Actions
  setCurrentUser: (user: User | null) => void;
  setCurrentDriver: (driver: Driver | null) => void;
  setPickups: (pickups: PickupRequest[]) => void;
  addPickup: (pickup: PickupRequest) => void;
  updatePickup: (id: string, updates: Partial<PickupRequest>) => void;
  setAllUsers: (users: User[]) => void;
  setAllDrivers: (drivers: Driver[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      currentUser: null,
      currentDriver: null,
      isAuthenticated: false,
      pickups: [],
      allUsers: [],
      allDrivers: [],
      isLoading: false,
      error: null,

      setCurrentUser: (user) => set({ currentUser: user, isAuthenticated: !!user }),
      setCurrentDriver: (driver) => set({ currentDriver: driver, isAuthenticated: !!driver }),
      setPickups: (pickups) => set({ pickups }),
      addPickup: (pickup) => set((s) => ({ pickups: [pickup, ...s.pickups] })),
      updatePickup: (id, updates) => set((s) => ({
        pickups: s.pickups.map(p => p.id === id ? { ...p, ...updates } : p)
      })),
      setAllUsers: (users) => set({ allUsers: users }),
      setAllDrivers: (drivers) => set({ allDrivers: drivers }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      logout: () => set({
        currentUser: null,
        currentDriver: null,
        isAuthenticated: false,
        pickups: [],
      }),
    }),
    {
      name: 'wastereturn-store',
      partialize: (state) => ({
        currentUser: state.currentUser,
        currentDriver: state.currentDriver,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);