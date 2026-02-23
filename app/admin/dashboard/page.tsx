// app/admin/dashboard/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Truck, 
  Recycle, 
  Award,
  TrendingUp,
  Clock,
  AlertTriangle,
  DollarSign,
  ArrowRight,
  Calendar,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// Mock data
const mockStats = {
  totalUsers: 12453,
  activeDrivers: 48,
  totalPickups: 3452,
  wasteCollected: 45280, // kg
  pointsIssued: 1250000,
  cashPaid: 625000, // ₦
  recyclingRate: 68,
  avgSortingAccuracy: 82,
};

const mockRecentPickups = [
  { id: 'PK001', user: 'John Doe', driver: 'Segun A.', weight: 12.5, points: 375, status: 'completed', time: '10 mins ago' },
  { id: 'PK002', user: 'Mary Jones', driver: 'Segun A.', weight: 8.2, points: 246, status: 'completed', time: '25 mins ago' },
  { id: 'PK003', user: 'Peter Okafor', driver: 'Musa K.', weight: 15.0, points: 450, status: 'en_route', time: 'in 15 mins' },
  { id: 'PK004', user: 'Adaobi N.', driver: 'Musa K.', weight: 5.5, points: 165, status: 'pending', time: 'scheduled' },
  { id: 'PK005', user: 'Chidi E.', driver: 'Unassigned', weight: 9.8, points: 294, status: 'pending', time: 'scheduled' },
];

const mockDrivers = [
  { id: 'D001', name: 'Segun Adeleke', active: true, pickupsToday: 12, rating: 4.8, earnings: 12500 },
  { id: 'D002', name: 'Musa Kabir', active: true, pickupsToday: 8, rating: 4.9, earnings: 9800 },
  { id: 'D003', name: 'Blessing John', active: false, pickupsToday: 0, rating: 4.7, earnings: 0 },
  { id: 'D004', name: 'Emeka Okafor', active: true, pickupsToday: 10, rating: 4.6, earnings: 11200 },
];

const mockWasteBreakdown = [
  { type: 'Plastics', amount: 15200, percentage: 33.6, color: '#00796B' },
  { type: 'Aluminum', amount: 8900, percentage: 19.7, color: '#F57C00' },
  { type: 'Paper', amount: 7600, percentage: 16.8, color: '#FF8F00' },
  { type: 'Glass', amount: 5400, percentage: 11.9, color: '#00ACC1' },
  { type: 'Electronics', amount: 4200, percentage: 9.3, color: '#7B1FA2' },
  { type: 'Others', amount: 3980, percentage: 8.7, color: '#757575' },
];

export default function AdminDashboardPage() {
  const [dateRange, setDateRange] = useState('today');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#1976D2]">Admin Dashboard</h1>
            <div className="flex items-center gap-3">
              <select 
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">+12%</span>
              </div>
              <p className="text-2xl font-bold">{mockStats.totalUsers.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Total Users</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Truck className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">{mockStats.activeDrivers} active</span>
              </div>
              <p className="text-2xl font-bold">{mockStats.totalPickups.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Total Pickups</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Recycle className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">{mockStats.recyclingRate}%</span>
              </div>
              <p className="text-2xl font-bold">{(mockStats.wasteCollected / 1000).toFixed(1)}t</p>
              <p className="text-sm text-gray-500">Waste Collected</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">₦{mockStats.cashPaid.toLocaleString()}</span>
              </div>
              <p className="text-2xl font-bold">{(mockStats.pointsIssued / 1000).toFixed(1)}k</p>
              <p className="text-sm text-gray-500">Points Issued</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Waste Breakdown */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Waste Collection Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockWasteBreakdown.map((item) => (
                  <div key={item.type}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.type}</span>
                      <span className="font-medium">{(item.amount / 1000).toFixed(1)}t ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span className="text-sm">Avg. Pickup Time</span>
                </div>
                <span className="font-bold">24 mins</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-gray-500" />
                  <span className="text-sm">Sorting Accuracy</span>
                </div>
                <span className="font-bold">{mockStats.avgSortingAccuracy}%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-gray-500" />
                  <span className="text-sm">Contamination Rate</span>
                </div>
                <span className="font-bold">12%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-gray-500" />
                  <span className="text-sm">Avg. Points/Pickup</span>
                </div>
                <span className="font-bold">312 pts</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Pickups & Drivers */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Pickups */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Pickups</CardTitle>
                <Link href="/admin/transactions">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockRecentPickups.map((pickup) => (
                  <div key={pickup.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{pickup.user}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{pickup.driver}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{pickup.weight}kg</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        pickup.status === 'completed' ? 'bg-green-100 text-green-600' :
                        pickup.status === 'en_route' ? 'bg-blue-100 text-blue-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        {pickup.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{pickup.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Drivers */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Active Drivers</CardTitle>
                <Link href="/admin/drivers">
                  <Button variant="ghost" size="sm" className="gap-1">
                    Manage <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockDrivers.filter(d => d.active).map((driver) => (
                  <div key={driver.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#1976D2]/10 rounded-full flex items-center justify-center">
                        <Truck className="w-5 h-5 text-[#1976D2]" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{driver.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{driver.pickupsToday} pickups</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-yellow-500">★ {driver.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">₦{driver.earnings.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">today</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Link href="/admin/users">
            <Button variant="outline" size="lg" fullWidth className="h-24 flex-col gap-2">
              <Users className="w-6 h-6" />
              <span>Manage Users</span>
            </Button>
          </Link>
          <Link href="/admin/drivers">
            <Button variant="outline" size="lg" fullWidth className="h-24 flex-col gap-2">
              <Truck className="w-6 h-6" />
              <span>Manage Drivers</span>
            </Button>
          </Link>
          <Link href="/admin/waste-categories">
            <Button variant="outline" size="lg" fullWidth className="h-24 flex-col gap-2">
              <Recycle className="w-6 h-6" />
              <span>Waste Categories</span>
            </Button>
          </Link>
          <Link href="/admin/reports">
            <Button variant="outline" size="lg" fullWidth className="h-24 flex-col gap-2">
              <TrendingUp className="w-6 h-6" />
              <span>Reports</span>
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}