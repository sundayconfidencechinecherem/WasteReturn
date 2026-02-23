// app/driver/earnings/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  DollarSign,
  TrendingUp,
  Calendar,
  Download,
  ChevronLeft,
  ChevronRight,
  Award,
  Clock,
  Truck,
  Star,
  Wallet
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatDate, formatPoints } from '@/lib/utils';

// Mock earnings data
const mockDriver = {
  name: 'Segun Adeleke',
  id: 'D001',
  stats: {
    today: 12500,
    week: 68400,
    month: 245000,
    total: 1250000,
    completedPickups: 1245,
    avgPerPickup: 1004,
    rating: 4.8,
    hoursOnline: 286
  }
};

const mockEarnings = [
  {
    id: 'E001',
    date: new Date('2026-02-20'),
    pickups: 12,
    amount: 12500,
    points: 25000,
    hours: 6.5,
    tips: 0
  },
  {
    id: 'E002',
    date: new Date('2026-02-19'),
    pickups: 10,
    amount: 11200,
    points: 22400,
    hours: 5.8,
    tips: 500
  },
  {
    id: 'E003',
    date: new Date('2026-02-18'),
    pickups: 14,
    amount: 14800,
    points: 29600,
    hours: 7.2,
    tips: 1000
  },
  {
    id: 'E004',
    date: new Date('2026-02-17'),
    pickups: 8,
    amount: 8900,
    points: 17800,
    hours: 4.5,
    tips: 0
  },
  {
    id: 'E005',
    date: new Date('2026-02-16'),
    pickups: 15,
    amount: 16200,
    points: 32400,
    hours: 8.0,
    tips: 1500
  },
];

const mockTransactions = [
  {
    id: 'T001',
    type: 'earning',
    description: 'Pickup earnings - 12 pickups',
    amount: 12500,
    date: new Date('2026-02-20'),
    status: 'completed'
  },
  {
    id: 'T002',
    type: 'bonus',
    description: 'Perfect week bonus',
    amount: 5000,
    date: new Date('2026-02-19'),
    status: 'completed'
  },
  {
    id: 'T003',
    type: 'withdrawal',
    description: 'Withdrawal to bank',
    amount: -50000,
    date: new Date('2026-02-15'),
    status: 'completed'
  },
  {
    id: 'T004',
    type: 'tip',
    description: 'Customer tip',
    amount: 1000,
    date: new Date('2026-02-14'),
    status: 'completed'
  },
];

export default function DriverEarningsPage() {
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('week');
  const [isLoading, setIsLoading] = useState(false);

  const handleWithdraw = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Withdrawal request submitted successfully!');
    }, 1500);
  };

  const getAmountColor = (amount: number) => {
    return amount >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'earning': return '💰';
      case 'bonus': return '🎁';
      case 'withdrawal': return '💳';
      case 'tip': return '🤝';
      default: return '📝';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/driver/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-semibold">My Earnings</h1>
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Statement
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Balance Card */}
        <Card className="mb-8 bg-linear-to-r from-[#1976D2] to-[#0D47A1] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm opacity-90">Available Balance</p>
                <p className="text-4xl font-bold">₦{mockDriver.stats.today.toLocaleString()}</p>
                <p className="text-xs opacity-75 mt-1">≈ {formatPoints(mockDriver.stats.today * 2)} points</p>
              </div>
              <Wallet className="w-12 h-12 opacity-75" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="secondary" size="lg" className="bg-white/20 text-white hover:bg-white/30 border-0">
                Withdraw
              </Button>
              <Button variant="secondary" size="lg" className="bg-white/20 text-white hover:bg-white/30 border-0">
                History
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-green-500" />
                <span className="text-xs text-gray-500">Today</span>
              </div>
              <p className="text-xl font-bold">₦{mockDriver.stats.today.toLocaleString()}</p>
              <p className="text-xs text-gray-500">{mockDriver.stats.completedPickups} pickups</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span className="text-xs text-gray-500">This Week</span>
              </div>
              <p className="text-xl font-bold">₦{mockDriver.stats.week.toLocaleString()}</p>
              <p className="text-xs text-gray-500">+12% from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-purple-500" />
                <span className="text-xs text-gray-500">This Month</span>
              </div>
              <p className="text-xl font-bold">₦{mockDriver.stats.month.toLocaleString()}</p>
              <p className="text-xs text-gray-500">of ₦300k target</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-yellow-500" />
                <span className="text-xs text-gray-500">Lifetime</span>
              </div>
              <p className="text-xl font-bold">₦{(mockDriver.stats.total / 1000000).toFixed(1)}M</p>
              <p className="text-xs text-gray-500">{mockDriver.stats.completedPickups} pickups</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Truck className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="text-xl font-bold">{mockDriver.stats.completedPickups}</p>
              <p className="text-xs text-gray-500">Total Pickups</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <p className="text-xl font-bold">{mockDriver.stats.rating}</p>
              <p className="text-xs text-gray-500">Rating</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <p className="text-xl font-bold">{mockDriver.stats.hoursOnline}h</p>
              <p className="text-xs text-gray-500">Hours Online</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <DollarSign className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-xl font-bold">₦{mockDriver.stats.avgPerPickup}</p>
              <p className="text-xs text-gray-500">Avg per Pickup</p>
            </CardContent>
          </Card>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2 mb-4">
          {(['day', 'week', 'month'] as const).map((p) => (
            <button
              key={p}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                period === p
                  ? 'bg-[#1976D2] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setPeriod(p)}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        {/* Earnings Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Daily Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-end justify-between gap-2">
              {mockEarnings.slice(0, 7).map((day, i) => {
                const height = (day.amount / 20000) * 100;
                return (
                  <div key={day.id} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-blue-100 rounded-t-lg relative group">
                      <div 
                        className="bg-[#1976D2] rounded-t-lg transition-all group-hover:bg-[#1565C0]"
                        style={{ height: `${height}%`, minHeight: '20px' }}
                      />
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        ₦{day.amount.toLocaleString()}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 mt-2">
                      {day.date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                      {getTypeIcon(tx.type)}
                    </div>
                    <div>
                      <p className="font-medium">{tx.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{formatDate(tx.date)}</span>
                        <Badge variant="success" className="text-xs">{tx.status}</Badge>
                      </div>
                    </div>
                  </div>
                  <p className={`font-bold ${getAmountColor(tx.amount)}`}>
                    {tx.amount > 0 ? '+' : ''}₦{Math.abs(tx.amount).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Withdraw Button */}
        <div className="mt-8">
          <Button 
            variant="primary" 
            size="lg" 
            fullWidth
            onClick={handleWithdraw}
            isLoading={isLoading}
          >
            Withdraw Earnings
          </Button>
        </div>
      </main>
    </div>
  );
}