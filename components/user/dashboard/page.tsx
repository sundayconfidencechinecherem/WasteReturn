// app/user/dashboard/page.tsx
'use client';

import { PointsDisplay } from '@/components/user/PointsDisplay';
import { ImpactStats } from '@/components/user/ImpactStats';
import { PickupCard } from '@/components/user/PickupCard';
import { WasteCategoryCard } from '@/components/user/WasteCategoryCard';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { WASTE_TYPES } from '@/lib/constants';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { PickupRequest, WasteType } from '@/lib/types';

// Mock data - replace with real data from API
const mockUser = {
  points: 3450,
  stats: {
    totalRecycled: 45,
    treesSaved: 12,
    waterSaved: 1500,
    co2Prevented: 30,
  },
  nextPickup: {
    id: 'pk_123',
    userId: 'user_1',
    householdId: 'house_1',
    scheduledDate: new Date('2026-02-22'),
    timeWindow: 'afternoon',
    status: 'assigned',
    wasteTypes: [
      { wasteTypeId: 'pet', estimatedWeight: 5 },
      { wasteTypeId: 'aluminum', estimatedWeight: 2 },
    ],
    estimatedArrival: new Date('2026-02-22T14:30:00'),
    createdAt: new Date(),
    updatedAt: new Date(),
  } as PickupRequest,
  recentPickups: [] as PickupRequest[],
};

export default function UserDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#1976D2]">WasteReturn</h1>
            <div className="flex items-center gap-3">
              <Link href="/notifications">
                <Button variant="ghost" size="sm" className="relative">
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                  🔔
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost" size="sm">
                  👤 John D.
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="flex gap-4">
              <Link href="/schedule" className="flex-1">
                <Button variant="primary" size="lg" className="w-full gap-2">
                  <PlusIcon className="w-5 h-5" />
                  Schedule Pickup
                </Button>
              </Link>
              <Link href="/dropoff" className="flex-1">
                <Button variant="outline" size="lg" className="w-full gap-2">
                  📍 Find Drop-off
                </Button>
              </Link>
            </div>

            {/* Next Pickup */}
            {mockUser.nextPickup && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Next Pickup</h2>
                <PickupCard pickup={mockUser.nextPickup} />
              </div>
            )}

            {/* Popular Waste Categories */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Popular Categories</h2>
                <Link href="/education" className="text-sm text-[#1976D2] hover:underline">
                  View all
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {WASTE_TYPES.slice(0, 4).map((waste) => (
                  <WasteCategoryCard
                    key={waste.id}
                    wasteType={waste as WasteType}
                  />
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#1976D2]/10 rounded-full flex items-center justify-center">
                          ♻️
                        </div>
                        <div>
                          <p className="font-medium">Pickup Completed</p>
                          <p className="text-sm text-gray-500">2 days ago • 5.2 kg</p>
                        </div>
                      </div>
                      <span className="font-semibold text-green-600">+270 pts</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <PointsDisplay points={mockUser.points} />
            
            <ImpactStats {...mockUser.stats} />

            <Card>
              <CardHeader>
                <CardTitle>Quick Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <span className="text-2xl">✨</span>
                  <div>
                    <p className="font-medium text-sm">Rinse containers</p>
                    <p className="text-xs text-gray-600">Clean items earn 1.2x points!</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-2xl">📦</span>
                  <div>
                    <p className="font-medium text-sm">Flatten cardboard</p>
                    <p className="text-xs text-gray-600">Saves space and earns bonus</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <p className="font-medium text-sm">Remove batteries</p>
                    <p className="text-xs text-gray-600">Prevents fire hazards</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rewards Near You</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Movie Ticket</p>
                    <p className="text-xs text-gray-500">2,500 pts</p>
                  </div>
                  <Button variant="outline" size="sm">Redeem</Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">₦1,000 Airtime</p>
                    <p className="text-xs text-gray-500">2,000 pts</p>
                  </div>
                  <Button variant="outline" size="sm">Redeem</Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Shopping Voucher</p>
                    <p className="text-xs text-gray-500">3,000 pts</p>
                  </div>
                  <Button variant="outline" size="sm">Redeem</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-6">
        <div className="flex justify-around">
          <Link href="/dashboard" className="text-[#1976D2]">🏠</Link>
          <Link href="/schedule" className="text-gray-400">📅</Link>
          <Link href="/wallet" className="text-gray-400">💰</Link>
          <Link href="/rewards" className="text-gray-400">🎁</Link>
          <Link href="/profile" className="text-gray-400">👤</Link>
        </div>
      </nav>
    </div>
  );
}