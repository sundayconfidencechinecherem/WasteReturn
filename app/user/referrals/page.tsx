'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Gift,
  Users,
  Share2,
  Copy,
  Check,
  Award,
  TrendingUp,
  Star,
  Mail,
  MessageCircle,
  Twitter,
  Facebook,
  Instagram,
  ChevronRight,
  Sparkles,
  Crown,
  Gem,
  Rocket,
  PartyPopper,
  UserPlus,
  Phone,
  Send,
  Download,
  Trophy
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import QRCode from 'qrcode';
import { useEffect, useRef } from 'react';

// Mock referrals data

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://wastereturn-e0wlnge61-confideces-projects.vercel.app';


const mockReferrals = {
  user: {
    name: 'John Doe',
    referralCode: 'JOHNDOE123',
    referralLink: `${BASE_URL}`,
    totalReferrals: 12,
    pendingReferrals: 3,
    earnedPoints: 1250,
    rank: 42,
    tier: 'Gold',
    nextTier: 'Platinum',
    nextTierProgress: 65,
    nextTierPoints: 2000
  },
  
  tiers: [
    { name: 'Bronze', minReferrals: 0, points: 50, badge: '🥉', color: 'from-orange-400 to-orange-600' },
    { name: 'Silver', minReferrals: 5, points: 100, badge: '🥈', color: 'from-gray-300 to-gray-500' },
    { name: 'Gold', minReferrals: 10, points: 200, badge: '🥇', color: 'from-yellow-400 to-yellow-600' },
    { name: 'Platinum', minReferrals: 20, points: 500, badge: '💎', color: 'from-purple-400 to-purple-600' },
    { name: 'Diamond', minReferrals: 50, points: 1000, badge: '💎', color: 'from-blue-400 to-blue-600' }
  ],
  
  rewards: [
    { id: 1, name: 'Referral Bonus', points: 50, description: 'Per friend who signs up', icon: '👥' },
    { id: 2, name: 'First Pickup Bonus', points: 100, description: 'When friend completes first pickup', icon: '♻️' },
    { id: 3, name: 'Monthly Top Referrer', points: 500, description: 'Most referrals this month', icon: '🏆' },
    { id: 4, name: 'Referral Streak', points: 200, description: 'Refer someone every week for a month', icon: '🔥' }
  ],
  
  recentReferrals: [
    { id: 1, name: 'Mary Jones', phone: '+234 812 345 6789', date: '2026-02-22', status: 'signed_up', pointsEarned: 50 },
    { id: 2, name: 'Peter Okafor', phone: '+234 803 123 4567', date: '2026-02-20', status: 'completed_pickup', pointsEarned: 150 },
    { id: 3, name: 'Adaobi Nwosu', phone: '+234 815 987 6543', date: '2026-02-18', status: 'signed_up', pointsEarned: 50 },
    { id: 4, name: 'Chidi Eze', phone: '+234 802 456 7890', date: '2026-02-15', status: 'completed_pickup', pointsEarned: 150 },
    { id: 5, name: 'Funmi Akinyemi', phone: '+234 809 111 2222', date: '2026-02-10', status: 'signed_up', pointsEarned: 50 }
  ],
  
  referralHistory: [
    { month: 'Jan', referrals: 2, points: 100 },
    { month: 'Feb', referrals: 4, points: 300 },
    { month: 'Mar', referrals: 3, points: 200 },
    { month: 'Apr', referrals: 3, points: 250 },
    { month: 'May', referrals: 5, points: 400 },
    { month: 'Jun', referrals: 0, points: 0 }
  ],
  
  leaderboard: [
    { rank: 1, name: 'EcoWarrior', referrals: 45, points: 2250, avatar: '👑' },
    { rank: 2, name: 'GreenQueen', referrals: 38, points: 1900, avatar: '👸' },
    { rank: 3, name: 'RecycleKing', referrals: 32, points: 1600, avatar: '🏆' },
    { rank: 4, name: 'PlasticFree', referrals: 28, points: 1400, avatar: '🌟' },
    { rank: 5, name: 'You', referrals: 12, points: 1250, avatar: '⭐', isCurrentUser: true },
    { rank: 6, name: 'EarthLover', referrals: 10, points: 500, avatar: '🌍' }
  ],
  
  monthlyBonus: {
    currentReferrals: 5,
    targetReferrals: 10,
    daysLeft: 12,
    bonusPoints: 500
  }
};

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [inviteMethod, setInviteMethod] = useState<'sms' | 'email' | 'whatsapp'>('sms');
  const [phoneNumber, setPhoneNumber] = useState('');
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showQR) {
      generateQRCode();
    }
  }, [showQR]);

  const generateQRCode = async () => {
    try {
      const url = await QRCode.toDataURL(mockReferrals.user.referralLink, {
        width: 200,
        margin: 2,
        color: {
          dark: '#1976D2',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(url);
    } catch (err) {
      console.error('Error generating QR code:', err);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareReferral = async () => {
    const shareData = {
      title: 'Join WasteReturn',
      text: `Join me on WasteReturn and earn points for recycling! Use my referral code: ${mockReferrals.user.referralCode}`,
      url: mockReferrals.user.referralLink,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      copyToClipboard(mockReferrals.user.referralLink);
    }
  };

  const sendInvite = () => {
    let url = '';
    
    if (inviteMethod === 'sms') {
      url = `sms:${phoneNumber}?body=Join me on WasteReturn and earn points for recycling! Use my referral code: ${mockReferrals.user.referralCode} ${mockReferrals.user.referralLink}`;
    } else if (inviteMethod === 'whatsapp') {
      url = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=Join me on WasteReturn and earn points for recycling! Use my referral code: ${mockReferrals.user.referralCode} ${mockReferrals.user.referralLink}`;
    } else if (inviteMethod === 'email') {
      url = `mailto:?subject=Join WasteReturn&body=Join me on WasteReturn and earn points for recycling! Use my referral code: ${mockReferrals.user.referralCode} ${mockReferrals.user.referralLink}`;
    }
    
    window.open(url, '_blank');
  };

  const downloadQR = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `wastereturn-referral-${mockReferrals.user.referralCode}.png`;
    link.click();
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'signed_up':
        return <Badge variant="default" className="bg-blue-100 text-blue-700">Signed Up</Badge>;
      case 'completed_pickup':
        return <Badge variant="success" className="bg-green-100 text-green-700">Completed Pickup</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/user/dashboard">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">Refer & Earn</h1>
              <p className="text-sm text-gray-500">Invite friends and earn points</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-24">
        {/* Hero Card */}
        <Card className="mb-6 bg-gradient-to-r from-[#1976D2] to-[#0D47A1] text-white overflow-hidden">
          <CardContent className="p-6 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8" />
            <div className="relative">
              <h2 className="text-2xl font-bold mb-2">Your Referral Code</h2>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white/20 px-6 py-3 rounded-lg font-mono text-xl tracking-wider">
                  {mockReferrals.user.referralCode}
                </div>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => copyToClipboard(mockReferrals.user.referralCode)}
                  className="bg-white/20 text-white hover:bg-white/30 border-0"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-sm opacity-90 mb-4">
                Share this code with friends. You both get 50 points when they sign up!
              </p>
              <div className="flex gap-2">
                <Button onClick={shareReferral} variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-0 gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Button onClick={() => setShowQR(!showQR)} variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-0 gap-2">
                  {showQR ? 'Hide QR' : 'Show QR'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* QR Code */}
        {showQR && (
          <Card className="mb-6">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold mb-4">Scan QR Code to Refer</h3>
              <div ref={qrRef} className="flex justify-center mb-4">
                {qrCodeUrl && (
                  <img src={qrCodeUrl} alt="Referral QR Code" className="w-48 h-48" />
                )}
              </div>
              <Button onClick={downloadQR} variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Download QR Code
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Referrals</p>
                  <p className="text-xl font-bold">{mockReferrals.user.totalReferrals}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Gift className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Points Earned</p>
                  <p className="text-xl font-bold">{mockReferrals.user.earnedPoints}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Star className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Current Tier</p>
                  <p className="text-xl font-bold">{mockReferrals.user.tier}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Global Rank</p>
                  <p className="text-xl font-bold">#{mockReferrals.user.rank}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tier Progress */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Crown className="w-5 h-5 text-[#1976D2]" />
              Referral Tier Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{mockReferrals.user.tier}</span>
                <Badge variant="gold" className="ml-2">
                  Current
                </Badge>
              </div>
              <span className="text-sm text-gray-500">Next: {mockReferrals.user.nextTier}</span>
            </div>
            
            <Progress value={mockReferrals.user.nextTierProgress} className="h-2 mb-2" />
            
            <div className="flex justify-between text-sm text-gray-500">
              <span>{mockReferrals.user.totalReferrals} referrals</span>
              <span>{mockReferrals.user.nextTierPoints - mockReferrals.user.earnedPoints} points to go</span>
            </div>

            {/* Tier Badges */}
            <div className="flex justify-between mt-4">
              {mockReferrals.tiers.map((tier, index) => (
                <div key={tier.name} className="text-center">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center text-lg mx-auto mb-1 ${
                    mockReferrals.user.tier === tier.name ? 'ring-2 ring-yellow-400 ring-offset-2' : 'opacity-50'
                  }`}>
                    {tier.badge}
                  </div>
                  <p className="text-xs font-medium">{tier.name}</p>
                  <p className="text-[10px] text-gray-500">{tier.minReferrals}+</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Bonus */}
        <Card className="mb-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                <h3 className="font-semibold">Monthly Bonus Challenge</h3>
              </div>
              <Badge variant="default" className="bg-white/20 text-white border-0">
                {mockReferrals.monthlyBonus.daysLeft} days left
              </Badge>
            </div>
            
            <p className="text-sm opacity-90 mb-3">
              Refer {mockReferrals.monthlyBonus.targetReferrals} friends this month for {mockReferrals.monthlyBonus.bonusPoints} bonus points!
            </p>
            
            <div className="flex items-center justify-between text-sm mb-1">
              <span>Progress</span>
              <span className="font-medium">{mockReferrals.monthlyBonus.currentReferrals}/{mockReferrals.monthlyBonus.targetReferrals}</span>
            </div>
            <Progress 
              value={(mockReferrals.monthlyBonus.currentReferrals / mockReferrals.monthlyBonus.targetReferrals) * 100} 
              className="h-2 bg-white/20"
              indicatorClassName="bg-white"
            />
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {['overview', 'history', 'leaderboard', 'invite'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
                selectedTab === tab
                  ? 'text-[#1976D2] border-b-2 border-[#1976D2]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <>
            {/* Rewards Grid */}
            <h3 className="font-semibold mb-3">Rewards Per Referral</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {mockReferrals.rewards.map((reward) => (
                <Card key={reward.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                        {reward.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{reward.name}</h4>
                        <p className="text-xs text-gray-500">{reward.description}</p>
                        <p className="text-sm font-bold text-yellow-600 mt-1">+{reward.points} points</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Referrals */}
            <h3 className="font-semibold mb-3">Recent Referrals</h3>
            <Card>
              <CardContent className="p-0">
                {mockReferrals.recentReferrals.map((referral, index) => (
                  <div 
                    key={referral.id}
                    className={`flex items-center justify-between p-4 ${
                      index !== mockReferrals.recentReferrals.length - 1 ? 'border-b border-gray-200' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg">
                        {referral.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{referral.name}</p>
                        <p className="text-xs text-gray-500">{referral.phone}</p>
                        <p className="text-xs text-gray-400 mt-1">{referral.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(referral.status)}
                      <p className="text-sm font-semibold text-green-600 mt-1">+{referral.pointsEarned}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </>
        )}

        {/* History Tab */}
        {selectedTab === 'history' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Referral History</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Monthly Chart */}
              <div className="h-40 flex items-end justify-between gap-2 mb-6">
                {mockReferrals.referralHistory.map((month) => (
                  <div key={month.month} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-blue-100 rounded-t-lg relative group">
                      <div 
                        className="bg-[#1976D2] rounded-t-lg transition-all duration-300"
                        style={{ height: `${(month.referrals / 6) * 100}px` }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                          {month.referrals} referrals • {month.points} pts
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-600">{month.month}</span>
                  </div>
                ))}
              </div>

              {/* All Referrals List */}
              <div className="space-y-3">
                {mockReferrals.recentReferrals.map((referral) => (
                  <div key={referral.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{referral.name}</p>
                      <p className="text-xs text-gray-500">{referral.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-green-600">+{referral.pointsEarned}</p>
                      {getStatusBadge(referral.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Leaderboard Tab */}
        {selectedTab === 'leaderboard' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Top Referrers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockReferrals.leaderboard.map((user) => (
                <div
                  key={user.rank}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    user.isCurrentUser ? 'bg-[#1976D2] text-white' : 'bg-gray-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    user.isCurrentUser ? 'bg-white/20' : 'bg-gray-200'
                  }`}>
                    {user.rank}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-lg">
                    {user.avatar}
                  </div>
                  <div className="flex-1 font-medium">{user.name}</div>
                  <div className="text-right">
                    <div className="font-bold">{user.referrals}</div>
                    <div className="text-xs opacity-75">{user.points} pts</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Invite Tab */}
        {selectedTab === 'invite' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Invite Friends</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Method Selection */}
              <div className="flex gap-2">
                {[
                  { id: 'sms', icon: MessageCircle, label: 'SMS' },
                  { id: 'whatsapp', icon: Send, label: 'WhatsApp' },
                  { id: 'email', icon: Mail, label: 'Email' }
                ].map((method) => {
                  const Icon = method.icon;
                  return (
                    <Button
                      key={method.id}
                      variant={inviteMethod === method.id ? 'primary' : 'outline'}
                      onClick={() => setInviteMethod(method.id as any)}
                      className="flex-1 gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {method.label}
                    </Button>
                  );
                })}
              </div>

              {/* Phone/Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {inviteMethod === 'email' ? 'Email Address' : 'Phone Number'}
                </label>
                <div className="flex gap-2">
                  <input
                    type={inviteMethod === 'email' ? 'email' : 'tel'}
                    placeholder={inviteMethod === 'email' ? 'friend@example.com' : '+234 800 000 0000'}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1976D2]"
                  />
                  <Button onClick={sendInvite} variant="primary" className="gap-2">
                    <Send className="w-4 h-4" />
                    Send
                  </Button>
                </div>
              </div>

              {/* Social Share */}
              <div className="pt-4">
                <p className="text-sm text-gray-500 mb-3">Or share on social media</p>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 gap-2" onClick={shareReferral}>
                    <Twitter className="w-4 h-4 text-blue-400" />
                    Twitter
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2" onClick={shareReferral}>
                    <Facebook className="w-4 h-4 text-blue-600" />
                    Facebook
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2" onClick={shareReferral}>
                    <Instagram className="w-4 h-4 text-pink-600" />
                    Instagram
                  </Button>
                </div>
              </div>

              {/* Copy Link */}
              <div className="pt-4">
                <p className="text-sm text-gray-500 mb-2">Or copy your referral link</p>
                <div className="flex gap-2">
                  <div className="flex-1 p-2 bg-gray-100 rounded-lg text-sm font-mono truncate">
                    {mockReferrals.user.referralLink}
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => copyToClipboard(mockReferrals.user.referralLink)}
                    className="gap-2"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Floating Action Button for Quick Invite */}
{/* Floating Action Button for Quick Invite */}
{/* Floating Action Button for Quick Invite */}
<button
  onClick={() => setSelectedTab('invite')}
  className="fixed right-4 bottom-20 lg:bottom-4 w-14 h-14 bg-[#1976D2] rounded-full shadow-lg flex items-center justify-center text-white hover:bg-[#1565C0] transition-colors z-20"
>
  <UserPlus className="w-6 h-6" />
</button>
    </div>
  );
}