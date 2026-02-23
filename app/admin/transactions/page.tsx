// app/admin/transactions/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Search, 
  Filter,
  Download,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  User,
  Truck,
  Recycle,
  Award
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { formatDate, formatPoints, pointsToNaira } from '@/lib/utils';

// Mock transactions data
const mockTransactions = [
  {
    id: 'TXN001',
    userId: 'U001',
    userName: 'John Doe',
    driverId: 'D001',
    driverName: 'Segun Adeleke',
    type: 'pickup',
    wasteTypes: ['PET Plastics', 'Aluminum'],
    weight: 12.5,
    points: 375,
    status: 'completed',
    date: new Date('2026-02-20T10:30:00'),
    paymentStatus: 'paid'
  },
  {
    id: 'TXN002',
    userId: 'U002',
    userName: 'Mary Jones',
    driverId: 'D001',
    driverName: 'Segun Adeleke',
    type: 'pickup',
    wasteTypes: ['Cardboard', 'Paper'],
    weight: 8.2,
    points: 246,
    status: 'completed',
    date: new Date('2026-02-20T11:45:00'),
    paymentStatus: 'paid'
  },
  {
    id: 'TXN003',
    userId: 'U003',
    userName: 'Peter Okafor',
    driverId: 'D002',
    driverName: 'Musa Kabir',
    type: 'pickup',
    wasteTypes: ['Electronics', 'Glass'],
    weight: 15.0,
    points: 450,
    status: 'in_progress',
    date: new Date('2026-02-20T14:30:00'),
    paymentStatus: 'pending'
  },
  {
    id: 'TXN004',
    userId: 'U004',
    userName: 'Adaobi Nwosu',
    driverId: null,
    driverName: 'Unassigned',
    type: 'dropoff',
    wasteTypes: ['Plastics'],
    weight: 5.5,
    points: 165,
    status: 'pending',
    date: new Date('2026-02-20T09:15:00'),
    paymentStatus: 'pending'
  },
  {
    id: 'TXN005',
    userId: 'U005',
    userName: 'Chidi Eze',
    driverId: 'D004',
    driverName: 'Emeka Okafor',
    type: 'pickup',
    wasteTypes: ['Aluminum', 'Glass'],
    weight: 9.8,
    points: 294,
    status: 'completed',
    date: new Date('2026-02-19T16:20:00'),
    paymentStatus: 'paid'
  },
  {
    id: 'TXN006',
    userId: 'U001',
    userName: 'John Doe',
    driverId: 'D001',
    driverName: 'Segun Adeleke',
    type: 'cashout',
    amount: 1000,
    points: 2000,
    status: 'completed',
    date: new Date('2026-02-19T13:10:00'),
    paymentStatus: 'paid'
  },
];

export default function AdminTransactionsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('today');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const stats = {
    total: mockTransactions.length,
    completed: mockTransactions.filter(t => t.status === 'completed').length,
    pending: mockTransactions.filter(t => t.status === 'pending' || t.status === 'in_progress').length,
    totalPoints: mockTransactions.reduce((sum, t) => sum + (t.points || 0), 0),
    totalCashout: mockTransactions.filter(t => t.type === 'cashout').reduce((sum, t) => sum + (t.amount || 0), 0),
  };

  const filteredTransactions = mockTransactions.filter(t => {
    if (filter !== 'all' && t.type !== filter) return false;
    if (search && !t.userName.toLowerCase().includes(search.toLowerCase()) && 
        !t.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed': return <Badge variant="success">Completed</Badge>;
      case 'in_progress': return <Badge variant="warning">In Progress</Badge>;
      case 'pending': return <Badge variant="default">Pending</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch(type) {
      case 'pickup': return <Badge variant="recyclable">Pickup</Badge>;
      case 'dropoff': return <Badge variant="electronic">Drop-off</Badge>;
      case 'cashout': return <Badge variant="success">Cash Out</Badge>;
      default: return <Badge variant="default">{type}</Badge>;
    }
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
              <h1 className="text-xl font-semibold">Transactions</h1>
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Total Transactions</p>
              <p className="text-xl font-bold">{stats.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Completed</p>
              <p className="text-xl font-bold text-green-600">{stats.completed}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Pending</p>
              <p className="text-xl font-bold text-yellow-600">{stats.pending}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Points Issued</p>
              <p className="text-xl font-bold text-purple-600">{stats.totalPoints.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Cash Paid</p>
              <p className="text-xl font-bold text-blue-600">₦{stats.totalCashout.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by user or transaction ID..."
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
                  <option value="all">All Types</option>
                  <option value="pickup">Pickups</option>
                  <option value="dropoff">Drop-offs</option>
                  <option value="cashout">Cash Outs</option>
                </select>
                <select 
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="custom">Custom Range</option>
                </select>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-y border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points/Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-mono text-sm">{tx.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">{formatDate(tx.date)}</div>
                        <div className="text-xs text-gray-500">{tx.date.toLocaleTimeString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{tx.userName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getTypeBadge(tx.type)}
                      </td>
                      <td className="px-6 py-4">
                        {tx.type === 'cashout' ? (
                          <div className="text-sm">
                            <span className="font-medium">Cash Out</span>
                            <div className="text-xs text-gray-500">₦{tx.amount}</div>
                          </div>
                        ) : (
                          <div>
                            <div className="text-sm flex flex-wrap gap-1">
                              {tx.wasteTypes?.map((w, i) => (
                                <span key={i} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                                  {w}
                                </span>
                              ))}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">{tx.weight} kg</div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {tx.driverName ? (
                          <div className="flex items-center gap-1">
                            <Truck className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{tx.driverName}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">Unassigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {tx.type === 'cashout' ? (
                          <span className="font-bold text-blue-600">₦{tx.amount}</span>
                        ) : (
                          <div>
                            <span className="font-bold text-purple-600">{tx.points} pts</span>
                            <div className="text-xs text-gray-500">≈ ₦{pointsToNaira(tx.points)}</div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(tx.status)}
                        <div className="text-xs text-gray-500 mt-1">{tx.paymentStatus}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button variant="ghost" size="sm" className="p-1">
                          <FileText className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Showing 1 to {filteredTransactions.length} of {filteredTransactions.length} entries
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}