// app/admin/users/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Search, 
  Filter,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Award,
  Trash2,
  Edit,
  UserCheck,
  UserX
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { formatDate, formatPoints } from '@/lib/utils';

// Mock users data
const mockUsers = [
  { 
    id: 'U001', 
    name: 'John Doe', 
    email: 'john@example.com', 
    phone: '08031234567',
    address: '12 Adebayo St, Lekki',
    points: 3450,
    pickups: 24,
    status: 'active',
    joined: '2026-01-15'
  },
  { 
    id: 'U002', 
    name: 'Mary Jones', 
    email: 'mary@example.com', 
    phone: '08039876543',
    address: '45 Admiralty Way, Lekki',
    points: 5670,
    pickups: 31,
    status: 'active',
    joined: '2026-01-03'
  },
  { 
    id: 'U003', 
    name: 'Peter Okafor', 
    email: 'peter@example.com', 
    phone: '08055667788',
    address: '8 Bourdillon Rd, Ikoyi',
    points: 1230,
    pickups: 8,
    status: 'inactive',
    joined: '2026-02-01'
  },
  { 
    id: 'U004', 
    name: 'Adaobi Nwosu', 
    email: 'adaobi@example.com', 
    phone: '08099001122',
    address: '23 Ajose Adeogun, VI',
    points: 8900,
    pickups: 45,
    status: 'active',
    joined: '2025-12-10'
  },
  { 
    id: 'U005', 
    name: 'Chidi Eze', 
    email: 'chidi@example.com', 
    phone: '08022334455',
    address: '7 Milverton Rd, Ikoyi',
    points: 2340,
    pickups: 15,
    status: 'active',
    joined: '2026-01-28'
  },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredUsers = mockUsers.filter(user => {
    if (filter !== 'all' && user.status !== filter) return false;
    if (search && !user.name.toLowerCase().includes(search.toLowerCase()) && 
        !user.email.toLowerCase().includes(search.toLowerCase()) &&
        !user.phone.includes(search)) return false;
    return true;
  });

  const stats = {
    total: mockUsers.length,
    active: mockUsers.filter(u => u.status === 'active').length,
    inactive: mockUsers.filter(u => u.status === 'inactive').length,
    totalPoints: mockUsers.reduce((sum, u) => sum + u.points, 0),
    totalPickups: mockUsers.reduce((sum, u) => sum + u.pickups, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">User Management</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Total Users</p>
              <p className="text-xl font-bold">{stats.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Active Users</p>
              <p className="text-xl font-bold text-green-600">{stats.active}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Inactive</p>
              <p className="text-xl font-bold text-gray-600">{stats.inactive}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Total Points</p>
              <p className="text-xl font-bold text-purple-600">{formatPoints(stats.totalPoints)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Total Pickups</p>
              <p className="text-xl font-bold text-blue-600">{stats.totalPickups}</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search users by name, email or phone..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select 
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Users</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-y border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickups</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">ID: {user.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <Mail className="w-4 h-4 mr-1 text-gray-400" />
                          {user.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Phone className="w-4 h-4 mr-1 text-gray-400" />
                          {user.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-1 text-gray-400 shrink-0 mt-0.5" />
                          <span>{user.address}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Award className="w-4 h-4 text-purple-500 mr-1" />
                          <span className="font-medium">{formatPoints(user.points)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.pickups}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          user.status === 'active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(user.joined)} {/* FIXED: Using our formatter */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-2">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}