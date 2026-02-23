// app/user/wallet/transactions/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Download,
  Filter,
  Calendar,
  Search,
  ChevronLeft,
  ChevronRight,
  Award,
  ShoppingBag,
  Wallet,
  Gift,
  TrendingUp,
  TrendingDown,
  FileText,
  Printer
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
    type: 'credit',
    category: 'pickup',
    description: 'Pickup - Plastics (5kg) & Aluminum (2kg)',
    amount: 270,
    balance: 3450,
    date: new Date('2026-02-20T10:30:00'),
    status: 'completed',
    reference: 'PK-20260220-001',
    details: {
      weight: '7.2 kg',
      items: ['PET Plastics', 'Aluminum Cans'],
      quality: 'Gold',
      multiplier: 1.5
    }
  },
  {
    id: 'TXN002',
    type: 'credit',
    category: 'pickup',
    description: 'Pickup - Cardboard (8kg) & Paper (3kg)',
    amount: 150,
    balance: 3180,
    date: new Date('2026-02-18T14:20:00'),
    status: 'completed',
    reference: 'PK-20260218-002',
    details: {
      weight: '11 kg',
      items: ['Cardboard', 'Office Paper'],
      quality: 'Silver',
      multiplier: 1.3
    }
  },
  {
    id: 'TXN003',
    type: 'debit',
    category: 'cashout',
    description: 'Cash out to GTBank (****1234)',
    amount: -1000,
    balance: 3030,
    date: new Date('2026-02-15T09:15:00'),
    status: 'completed',
    reference: 'CO-20260215-001',
    details: {
      bank: 'GTBank',
      account: '****1234',
      amount: '₦500',
      rate: '2 pts = ₦1'
    }
  },
  {
    id: 'TXN004',
    type: 'credit',
    category: 'bonus',
    description: 'Referral bonus - Tunde joined',
    amount: 50,
    balance: 4030,
    date: new Date('2026-02-14T16:45:00'),
    status: 'completed',
    reference: 'BN-20260214-001',
    details: {
      referral: 'Tunde Doe',
      type: 'New user signup'
    }
  },
  {
    id: 'TXN005',
    type: 'debit',
    category: 'redemption',
    description: 'Redeemed - Movie tickets (2)',
    amount: -500,
    balance: 3980,
    date: new Date('2026-02-12T11:30:00'),
    status: 'completed',
    reference: 'RD-20260212-001',
    details: {
      reward: 'Movie Tickets',
      quantity: 2,
      venue: 'Filmhouse Cinema'
    }
  },
  {
    id: 'TXN006',
    type: 'credit',
    category: 'pickup',
    description: 'Pickup - Electronics (1.5kg) & Glass (4kg)',
    amount: 320,
    balance: 4480,
    date: new Date('2026-02-10T13:45:00'),
    status: 'completed',
    reference: 'PK-20260210-003',
    details: {
      weight: '5.5 kg',
      items: ['Electronics', 'Glass'],
      quality: 'Gold',
      multiplier: 1.5
    }
  },
  {
    id: 'TXN007',
    type: 'credit',
    category: 'bonus',
    description: 'Sorting bonus - Perfect week',
    amount: 100,
    balance: 4160,
    date: new Date('2026-02-08T08:00:00'),
    status: 'completed',
    reference: 'BN-20260208-002',
    details: {
      reason: '7 days of Gold quality sorting',
      multiplier: '1.5x'
    }
  },
  {
    id: 'TXN008',
    type: 'debit',
    category: 'bill',
    description: 'Electricity bill payment',
    amount: -800,
    balance: 4060,
    date: new Date('2026-02-05T15:20:00'),
    status: 'completed',
    reference: 'BL-20260205-001',
    details: {
      provider: 'IKEDC',
      meter: '****5678',
      amount: '₦400'
    }
  },
];

export default function WalletTransactionsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredTransactions = mockTransactions.filter(tx => {
    if (filter !== 'all' && tx.category !== filter) return false;
    if (search && !tx.description.toLowerCase().includes(search.toLowerCase()) && 
        !tx.reference.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'pickup': return '♻️';
      case 'cashout': return '💰';
      case 'bonus': return '🎁';
      case 'redemption': return '🎫';
      case 'bill': return '⚡';
      default: return '📝';
    }
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'pickup': return 'bg-green-100 text-green-600';
      case 'cashout': return 'bg-blue-100 text-blue-600';
      case 'bonus': return 'bg-purple-100 text-purple-600';
      case 'redemption': return 'bg-orange-100 text-orange-600';
      case 'bill': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed': return <Badge variant="success">Completed</Badge>;
      case 'pending': return <Badge variant="warning">Pending</Badge>;
      case 'failed': return <Badge variant="danger">Failed</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  // Calculate totals
  const totalCredits = mockTransactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalDebits = mockTransactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/user/wallet">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-semibold">Transaction History</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Printer className="w-4 h-4" />
                Print
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-xs text-gray-500">Total Credits</span>
              </div>
              <p className="text-xl font-bold text-green-600">{formatPoints(totalCredits)} pts</p>
              <p className="text-xs text-gray-500">≈ ₦{pointsToNaira(totalCredits)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown className="w-4 h-4 text-red-500" />
                <span className="text-xs text-gray-500">Total Debits</span>
              </div>
              <p className="text-xl font-bold text-red-600">{formatPoints(totalDebits)} pts</p>
              <p className="text-xs text-gray-500">≈ ₦{pointsToNaira(totalDebits)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-purple-500" />
                <span className="text-xs text-gray-500">Pickups</span>
              </div>
              <p className="text-xl font-bold text-purple-600">
                {mockTransactions.filter(t => t.category === 'pickup').length}
              </p>
              <p className="text-xs text-gray-500">transactions</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Wallet className="w-4 h-4 text-blue-500" />
                <span className="text-xs text-gray-500">Current Balance</span>
              </div>
              <p className="text-xl font-bold text-blue-600">{formatPoints(3450)} pts</p>
              <p className="text-xs text-gray-500">as of today</p>
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
                  placeholder="Search by description or reference..."
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
                  <option value="all">All Categories</option>
                  <option value="pickup">Pickups</option>
                  <option value="cashout">Cash Outs</option>
                  <option value="bonus">Bonuses</option>
                  <option value="redemption">Redemptions</option>
                  <option value="bill">Bill Payments</option>
                </select>
                <select 
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="3months">Last 3 Months</option>
                </select>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200">
              {filteredTransactions.map((tx) => (
                <div 
                  key={tx.id} 
                  className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                    selectedTransaction === tx.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedTransaction(
                    selectedTransaction === tx.id ? null : tx.id
                  )}
                >
                  {/* Main Transaction Row */}
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${getCategoryColor(tx.category)}`}>
                      {getCategoryIcon(tx.category)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{tx.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">{formatDate(tx.date)}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">{tx.date.toLocaleTimeString()}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs font-mono text-gray-400">{tx.reference}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${
                            tx.type === 'credit' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {tx.type === 'credit' ? '+' : '-'}{formatPoints(Math.abs(tx.amount))} pts
                          </p>
                          <p className="text-xs text-gray-500">
                            Balance: {formatPoints(tx.balance)} pts
                          </p>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="mt-2">
                        {getStatusBadge(tx.status)}
                      </div>

                      {/* Expanded Details */}
                      {selectedTransaction === tx.id && tx.details && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <h4 className="text-sm font-medium mb-3">Transaction Details</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            {tx.category === 'pickup' && (
                              <>
                                <div>
                                  <p className="text-gray-500">Weight</p>
                                  <p className="font-medium">{tx.details.weight}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Sorting Quality</p>
                                  <p className="font-medium">{tx.details.quality} ({tx.details.multiplier}x)</p>
                                </div>
                                <div className="col-span-2">
                                  <p className="text-gray-500">Items</p>
                                  <div className="flex gap-2 mt-1">
                                    {tx.details.items?.map((item: string, i: number) => (
                                      <Badge key={i} variant="default" className="bg-gray-200">
                                        {item}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </>
                            )}

                            {tx.category === 'cashout' && (
                              <>
                                <div>
                                  <p className="text-gray-500">Bank</p>
                                  <p className="font-medium">{tx.details.bank}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Account</p>
                                  <p className="font-medium">{tx.details.account}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Amount Received</p>
                                  <p className="font-medium">{tx.details.amount}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Conversion Rate</p>
                                  <p className="font-medium">{tx.details.rate}</p>
                                </div>
                              </>
                            )}

                            {tx.category === 'redemption' && (
                              <>
                                <div>
                                  <p className="text-gray-500">Reward</p>
                                  <p className="font-medium">{tx.details.reward}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Quantity</p>
                                  <p className="font-medium">{tx.details.quantity}</p>
                                </div>
                                <div className="col-span-2">
                                  <p className="text-gray-500">Venue</p>
                                  <p className="font-medium">{tx.details.venue}</p>
                                </div>
                              </>
                            )}

                            {tx.category === 'bonus' && (
                              <div className="col-span-2">
                                <p className="text-gray-500">Reason</p>
                                <p className="font-medium">{tx.details.reason || tx.details.referral}</p>
                              </div>
                            )}

                            {tx.category === 'bill' && (
                              <>
                                <div>
                                  <p className="text-gray-500">Provider</p>
                                  <p className="font-medium">{tx.details.provider}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Meter Number</p>
                                  <p className="font-medium">{tx.details.meter}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Amount Paid</p>
                                  <p className="font-medium">{tx.details.amount}</p>
                                </div>
                              </>
                            )}
                          </div>

                          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                            <Button variant="outline" size="sm" className="gap-1">
                              <FileText className="w-4 h-4" />
                              Receipt
                            </Button>
                            <Button variant="outline" size="sm" className="gap-1">
                              <Download className="w-4 h-4" />
                              Download
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Showing 1 to {filteredTransactions.length} of {filteredTransactions.length} transactions
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

        {/* Download Options */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            PDF Statement
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            CSV Export
          </Button>
          <Button variant="outline" className="gap-2">
            <Printer className="w-4 h-4" />
            Print Statement
          </Button>
        </div>
      </main>
    </div>
  );
}