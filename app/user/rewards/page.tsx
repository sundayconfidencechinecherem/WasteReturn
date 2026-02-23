// app/user/wallet/redeem/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft,
  Gift,
  Wallet,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Star,
  Award,
  Tag,
  ShoppingBag,
  Ticket,
  Coffee,
  Zap,
  Smartphone,
  Tv,
  Home,
  ChevronRight,
  Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { formatPoints, pointsToNaira } from '@/lib/utils';
import { toast } from 'react-hot-toast';

// Mock rewards data
const mockRewards = [
  {
    id: 'R001',
    title: 'Movie Ticket',
    description: '2D movie ticket at Filmhouse Cinemas',
    category: 'entertainment',
    pointsRequired: 2500,
    value: '₦1,250',
    icon: '🎬',
    popular: true,
    expiryDays: 30,
    terms: 'Valid for standard 2D movies only. Not valid on public holidays.'
  },
  {
    id: 'R002',
    title: '₦1,000 Airtime',
    description: 'Airtime recharge for any network',
    category: 'utility',
    pointsRequired: 2000,
    value: '₦1,000',
    icon: '📱',
    popular: true,
    expiryDays: 90,
    terms: 'Valid for MTN, Glo, Airtel, and 9mobile.'
  },
  {
    id: 'R003',
    title: 'Shopping Voucher',
    description: '₦2,000 voucher for ShopRite',
    category: 'shopping',
    pointsRequired: 4000,
    value: '₦2,000',
    icon: '🛒',
    popular: false,
    expiryDays: 45,
    terms: 'Valid at any ShopRite store in Lagos.'
  },
  {
    id: 'R004',
    title: 'Electricity Bill Payment',
    description: 'Pay your electricity bill',
    category: 'utility',
    pointsRequired: 1000,
    value: '₦500',
    icon: '⚡',
    popular: false,
    expiryDays: 60,
    terms: 'Valid for IKEDC, EKEDC, and PHED.'
  },
  {
    id: 'R005',
    title: 'Coffee Voucher',
    description: 'Free coffee at Café Neo',
    category: 'dining',
    pointsRequired: 800,
    value: '₦400',
    icon: '☕',
    popular: true,
    expiryDays: 30,
    terms: 'Valid for any regular coffee drink.'
  },
  {
    id: 'R006',
    title: 'Data Bundle',
    description: '1GB data for any network',
    category: 'utility',
    pointsRequired: 1200,
    value: '₦600',
    icon: '📶',
    popular: false,
    expiryDays: 30,
    terms: 'Valid for 30 days from purchase.'
  },
  {
    id: 'R007',
    title: 'Restaurant Discount',
    description: '20% off at Chicken Republic',
    category: 'dining',
    pointsRequired: 1500,
    value: 'Up to ₦1,000',
    icon: '🍗',
    popular: false,
    expiryDays: 60,
    terms: 'Maximum discount of ₦1,000.'
  },
  {
    id: 'R008',
    title: 'Fitness Class',
    description: 'Free fitness class at FitLab',
    category: 'wellness',
    pointsRequired: 3000,
    value: '₦1,500',
    icon: '💪',
    popular: false,
    expiryDays: 30,
    terms: 'Valid for one group class.'
  }
];

const mockRedemptions = [
  {
    id: 'RD001',
    rewardId: 'R002',
    title: '₦1,000 Airtime',
    pointsUsed: 2000,
    date: new Date('2026-02-15'),
    status: 'completed',
    code: 'AIR-1234-5678',
    instructions: 'Dial *123*5678# to redeem'
  },
  {
    id: 'RD002',
    rewardId: 'R005',
    title: 'Coffee Voucher',
    pointsUsed: 800,
    date: new Date('2026-02-10'),
    status: 'active',
    code: 'COF-9876-5432',
    instructions: 'Show this code at any Café Neo'
  }
];

const categories = [
  { id: 'all', label: 'All', icon: Gift },
  { id: 'popular', label: 'Popular', icon: Star },
  { id: 'entertainment', label: 'Entertainment', icon: Ticket },
  { id: 'dining', label: 'Dining', icon: Coffee },
  { id: 'shopping', label: 'Shopping', icon: ShoppingBag },
  { id: 'utility', label: 'Utility', icon: Zap },
  { id: 'wellness', label: 'Wellness', icon: Award }
];

export default function RedeemPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedReward, setSelectedReward] = useState<any>(null);
  const [step, setStep] = useState<'browse' | 'details' | 'confirm' | 'success'>('browse');
  const [isLoading, setIsLoading] = useState(false);
  const [redemptionCode, setRedemptionCode] = useState('');

  const userPoints = 3450;

  const filteredRewards = mockRewards.filter(reward => {
    if (selectedCategory !== 'all' && selectedCategory !== 'popular' && reward.category !== selectedCategory) return false;
    if (selectedCategory === 'popular' && !reward.popular) return false;
    if (search && !reward.title.toLowerCase().includes(search.toLowerCase()) && 
        !reward.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleSelectReward = (reward: any) => {
    setSelectedReward(reward);
    setStep('details');
  };

  const handleConfirm = () => {
    setStep('confirm');
  };

  const handleRedeem = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setRedemptionCode('RWD-' + Math.random().toString(36).substring(2, 10).toUpperCase());
      setStep('success');
    }, 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(redemptionCode);
    toast.success('Code copied to clipboard!');
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat?.icon || Gift;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/user/wallet">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Redeem Rewards</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 pb-24">
        {/* Points Balance */}
        <Card className="mb-6 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Your Points Balance</p>
                <p className="text-3xl font-bold">{formatPoints(userPoints)} pts</p>
                <p className="text-sm opacity-75 mt-1">≈ ₦{pointsToNaira(userPoints)}</p>
              </div>
              <Award className="w-12 h-12 opacity-75" />
            </div>
          </CardContent>
        </Card>

        {step === 'browse' && (
          <>
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search rewards..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                      selectedCategory === cat.id
                        ? 'bg-[#1976D2] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Rewards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {filteredRewards.map((reward) => {
                const canAfford = userPoints >= reward.pointsRequired;
                return (
                  <Card 
                    key={reward.id} 
                    className={`hover:shadow-lg transition-shadow cursor-pointer ${
                      !canAfford ? 'opacity-75' : ''
                    }`}
                    onClick={() => canAfford && handleSelectReward(reward)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                          {reward.icon}
                        </div>
                        {reward.popular && (
                          <Badge variant="gold">Popular</Badge>
                        )}
                      </div>

                      <h3 className="font-semibold mb-1">{reward.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{reward.description}</p>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold text-purple-600">
                            {formatPoints(reward.pointsRequired)} pts
                          </p>
                          <p className="text-xs text-gray-500">Value: {reward.value}</p>
                        </div>
                        {canAfford ? (
                          <Badge variant="success">Available</Badge>
                        ) : (
                          <Badge variant="default">Need {formatPoints(reward.pointsRequired - userPoints)} more</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Recent Redemptions */}
            {mockRedemptions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Redemptions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockRedemptions.map((redemption) => (
                    <div key={redemption.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{redemption.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{redemption.date.toLocaleDateString()}</span>
                          <Badge variant={redemption.status === 'active' ? 'success' : 'default'}>
                            {redemption.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-purple-600">{redemption.pointsUsed} pts</p>
                        <Button variant="ghost" size="sm" className="mt-1">
                          View <ChevronRight className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </>
        )}

        {step === 'details' && selectedReward && (
          <div className="space-y-6">
            {/* Reward Details */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl">
                    {selectedReward.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedReward.title}</h2>
                    <p className="text-gray-600">{selectedReward.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Points Required</p>
                    <p className="text-xl font-bold text-purple-600">{formatPoints(selectedReward.pointsRequired)} pts</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Value</p>
                    <p className="text-xl font-bold text-green-600">{selectedReward.value}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Expires in</p>
                    <p className="text-lg font-bold">{selectedReward.expiryDays} days</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Category</p>
                    <p className="text-lg font-bold capitalize">{selectedReward.category}</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm text-blue-800">Terms & Conditions</p>
                      <p className="text-sm text-blue-700 mt-1">{selectedReward.terms}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="flex-1"
                    onClick={() => setStep('browse')}
                  >
                    Back
                  </Button>
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="flex-1"
                    onClick={handleConfirm}
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'confirm' && selectedReward && (
          <div className="space-y-6">
            {/* Confirmation */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Confirm Redemption</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Reward:</span>
                    <span className="font-medium">{selectedReward.title}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Points to deduct:</span>
                    <span className="font-bold text-purple-600">{formatPoints(selectedReward.pointsRequired)} pts</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Current balance:</span>
                    <span className="font-medium">{formatPoints(userPoints)} pts</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">New balance:</span>
                    <span className="font-bold">{formatPoints(userPoints - selectedReward.pointsRequired)} pts</span>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-yellow-700">
                    Once confirmed, points will be deducted immediately. Redemption codes are non-refundable.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="flex-1"
                    onClick={() => setStep('details')}
                  >
                    Back
                  </Button>
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="flex-1"
                    onClick={handleRedeem}
                    isLoading={isLoading}
                  >
                    Confirm & Redeem
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'success' && (
          <div className="space-y-6">
            {/* Success */}
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Redemption Successful!</h2>
                <p className="text-gray-600 mb-6">
                  Your reward has been added to your account.
                </p>

                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <p className="text-sm text-gray-500 mb-2">Your Redemption Code</p>
                  <div className="flex items-center gap-2 justify-center mb-3">
                    <code className="px-4 py-2 bg-white rounded-lg font-mono text-lg">
                      {redemptionCode}
                    </code>
                    <Button variant="outline" size="sm" onClick={handleCopyCode}>
                      Copy
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">{selectedReward?.instructions || 'Show this code at the venue'}</p>
                </div>

                <div className="space-y-3">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    fullWidth
                    onClick={() => router.push('/user/wallet')}
                  >
                    Done
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    fullWidth
                    onClick={() => {
                      setStep('browse');
                      setSelectedReward(null);
                    }}
                  >
                    Redeem Another
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}