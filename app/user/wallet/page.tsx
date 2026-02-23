// app/user/wallet/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { PointsDisplay } from '@/components/user/PointsDisplay';
import { ArrowLeftIcon, DownloadIcon, TrendingUpIcon, GiftIcon, BanknoteIcon } from 'lucide-react';
import { formatDate, formatPoints, pointsToNaira } from '@/lib/utils';

// Mock data
const mockUser = {
  points: 3450,
  transactions: [
    {
      id: '1',
      type: 'credit',
      amount: 270,
      reason: 'pickup',
      description: 'Pickup - Plastics & Aluminum',
      date: new Date('2026-02-20'),
      balance: 3450,
    },
    {
      id: '2',
      type: 'credit',
      amount: 150,
      reason: 'pickup',
      description: 'Pickup - Cardboard & Paper',
      date: new Date('2026-02-18'),
      balance: 3180,
    },
    {
      id: '3',
      type: 'debit',
      amount: 1000,
      reason: 'cashout',
      description: 'Cash out to bank',
      date: new Date('2026-02-15'),
      balance: 3030,
    },
    {
      id: '4',
      type: 'credit',
      amount: 50,
      reason: 'bonus',
      description: 'Referral bonus - Tunde',
      date: new Date('2026-02-14'),
      balance: 4030,
    },
  ] as any[],
};

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'cashout'>('overview');

  const totalEarned = mockUser.transactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalCashedOut = mockUser.transactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/user/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeftIcon className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">My Wallet</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Points Overview */}
          <PointsDisplay points={mockUser.points} showActions={false} />

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUpIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Earned</p>
                    <p className="text-lg font-bold">{formatPoints(totalEarned)} pts</p>
                    <p className="text-xs text-gray-500">≈ ₦{pointsToNaira(totalEarned)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <BanknoteIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Cashed Out</p>
                    <p className="text-lg font-bold">{formatPoints(totalCashedOut)} pts</p>
                    <p className="text-xs text-gray-500">≈ ₦{pointsToNaira(totalCashedOut)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Link href="/user/wallet/cash-out">
              <Button variant="primary" size="lg" fullWidth className="gap-2">
                <BanknoteIcon className="w-5 h-5" />
                Cash Out
              </Button>
            </Link>
            <Link href="/user/rewards">
              <Button variant="outline" size="lg" fullWidth className="gap-2">
                <GiftIcon className="w-5 h-5" />
                Redeem Rewards
              </Button>
            </Link>
          </div>

          {/* Tabs */}
          <div className="mt-8">
            <div className="border-b border-gray-200">
              <nav className="flex gap-8">
                {(['overview', 'transactions', 'cashout'] as const).map((tab) => (
                  <button
                    key={tab}
                    className={`pb-4 px-1 capitalize ${
                      activeTab === tab
                        ? 'border-b-2 border-[#1976D2] text-[#1976D2] font-medium'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            <div className="mt-6">
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500">This Month</p>
                          <p className="text-2xl font-bold">{formatPoints(1250)} pts</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">This Week</p>
                          <p className="text-2xl font-bold">{formatPoints(420)} pts</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Points Value</p>
                          <p className="text-2xl font-bold">2 pts = ₦1</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>How to Earn More</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <span className="text-green-600">✓</span>
                          <span className="text-sm">Rinse containers for 1.2x points</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-green-600">✓</span>
                          <span className="text-sm">Remove labels from PET bottles for 1.3x points</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-green-600">✓</span>
                          <span className="text-sm">Flatten cardboard to save space</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-green-600">✓</span>
                          <span className="text-sm">Refer friends and earn 50 points each</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'transactions' && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Transaction History</CardTitle>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <DownloadIcon className="w-4 h-4" />
                        Export
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockUser.transactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between py-3 border-b last:border-0">
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              tx.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                            }`}>
                              {tx.type === 'credit' ? '📈' : '📉'}
                            </div>
                            <div>
                              <p className="font-medium">{tx.description}</p>
                              <p className="text-xs text-gray-500">{formatDate(tx.date)}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-bold ${
                              tx.type === 'credit' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {tx.type === 'credit' ? '+' : '-'}{formatPoints(tx.amount)} pts
                            </p>
                            <p className="text-xs text-gray-500">Balance: {formatPoints(tx.balance)} pts</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'cashout' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Cash Out History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockUser.transactions
                        .filter(tx => tx.reason === 'cashout')
                        .map((tx) => (
                          <div key={tx.id} className="flex items-center justify-between py-3 border-b last:border-0">
                            <div>
                              <p className="font-medium">{tx.description}</p>
                              <p className="text-xs text-gray-500">{formatDate(tx.date)}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-red-600">-{formatPoints(tx.amount)} pts</p>
                              <p className="text-xs text-gray-500">≈ ₦{pointsToNaira(tx.amount)}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}