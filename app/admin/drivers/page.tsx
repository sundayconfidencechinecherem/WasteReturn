// app/admin/drivers/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Search, 
  Filter,
  Truck,
  Star,
  Clock,
  DollarSign,
  MapPin,
  Phone,
  Mail,
  MoreVertical,
  UserPlus,
  Edit,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';

// Mock drivers data
const mockDrivers = [
  { 
    id: 'D001', 
    name: 'Segun Adeleke', 
    email: 'segun.a@wastereturn.com', 
    phone: '08031234567',
    address: '23 Ikeja, Lagos',
    status: 'active',
    rating: 4.8,
    totalPickups: 1245,
    todayPickups: 12,
    earnings: 12500,
    joined: '2025-10-15',
    vehicle: 'Tricycle - ABC123XY',
    zone: 'Lekki Phase 1'
  },
  { 
    id: 'D002', 
    name: 'Musa Kabir', 
    email: 'musa.k@wastereturn.com', 
    phone: '08039876543',
    address: '45 Agege, Lagos',
    status: 'active',
    rating: 4.9,
    totalPickups: 987,
    todayPickups: 8,
    earnings: 9800,
    joined: '2025-11-03',
    vehicle: 'Tricycle - DEF456UV',
    zone: 'Ikeja'
  },
  { 
    id: 'D003', 
    name: 'Blessing John', 
    email: 'blessing.j@wastereturn.com', 
    phone: '08055667788',
    address: '12 Surulere, Lagos',
    status: 'offline',
    rating: 4.7,
    totalPickups: 756,
    todayPickups: 0,
    earnings: 0,
    joined: '2025-12-01',
    vehicle: 'Tricycle - GHI789WZ',
    zone: 'Surulere'
  },
  { 
    id: 'D004', 
    name: 'Emeka Okafor', 
    email: 'emeka.o@wastereturn.com', 
    phone: '08099001122',
    address: '34 VI, Lagos',
    status: 'active',
    rating: 4.6,
    totalPickups: 1102,
    todayPickups: 10,
    earnings: 11200,
    joined: '2025-09-28',
    vehicle: 'Truck - JKL012MN',
    zone: 'Victoria Island'
  },
  { 
    id: 'D005', 
    name: 'Fatima Bello', 
    email: 'fatima.b@wastereturn.com', 
    phone: '08022334455',
    address: '67 Yaba, Lagos',
    status: 'suspended',
    rating: 4.2,
    totalPickups: 432,
    todayPickups: 0,
    earnings: 0,
    joined: '2026-01-20',
    vehicle: 'Tricycle - OPQ345RS',
    zone: 'Yaba'
  },
];

export default function AdminDriversPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredDrivers = mockDrivers.filter(driver => {
    if (filter !== 'all' && driver.status !== filter) return false;
    if (search && !driver.name.toLowerCase().includes(search.toLowerCase()) && 
        !driver.email.toLowerCase().includes(search.toLowerCase()) &&
        !driver.phone.includes(search)) return false;
    return true;
  });

  const stats = {
    total: mockDrivers.length,
    active: mockDrivers.filter(d => d.status === 'active').length,
    offline: mockDrivers.filter(d => d.status === 'offline').length,
    suspended: mockDrivers.filter(d => d.status === 'suspended').length,
    totalEarnings: mockDrivers.reduce((sum, d) => sum + d.earnings, 0),
    totalPickups: mockDrivers.reduce((sum, d) => sum + d.totalPickups, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-semibold">Driver Management</h1>
            </div>
            <Button variant="primary" className="gap-2">
              <UserPlus className="w-4 h-4" />
              Add New Driver
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Total Drivers</p>
              <p className="text-xl font-bold">{stats.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Active</p>
              <p className="text-xl font-bold text-green-600">{stats.active}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Offline</p>
              <p className="text-xl font-bold text-gray-600">{stats.offline}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Suspended</p>
              <p className="text-xl font-bold text-red-600">{stats.suspended}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Total Pickups</p>
              <p className="text-xl font-bold text-blue-600">{stats.totalPickups}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Today's Earnings</p>
              <p className="text-xl font-bold text-purple-600">₦{stats.totalEarnings.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search drivers by name, email, phone or zone..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <select 
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="offline">Offline</option>
                  <option value="suspended">Suspended</option>
                </select>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Drivers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrivers.map((driver) => (
            <Card key={driver.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#1976D2]/10 rounded-full flex items-center justify-center">
                      <Truck className="w-6 h-6 text-[#1976D2]" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{driver.name}</h3>
                      <p className="text-sm text-gray-500">ID: {driver.id}</p>
                    </div>
                  </div>
                  <Badge variant={
                    driver.status === 'active' ? 'success' :
                    driver.status === 'offline' ? 'default' : 'danger'
                  }>
                    {driver.status}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{driver.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{driver.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{driver.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="w-4 h-4 text-gray-400" />
                    <span>{driver.vehicle}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <Star className="w-4 h-4 text-yellow-500 mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Rating</p>
                    <p className="font-bold text-sm">{driver.rating}</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <Clock className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Today</p>
                    <p className="font-bold text-sm">{driver.todayPickups}</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <DollarSign className="w-4 h-4 text-green-500 mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Earnings</p>
                    <p className="font-bold text-sm">₦{driver.earnings}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">Zone: {driver.zone}</p>
                    <p className="text-xs text-gray-500">Joined: {formatDate(driver.joined)}</p> {/* FIXED */}
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="p-1">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-1 text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-1">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}