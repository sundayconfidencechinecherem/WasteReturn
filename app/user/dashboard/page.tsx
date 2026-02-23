// app/user/dashboard/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Plus,
  MapPin,
  Calendar,
  Clock,
  Award,
  TrendingUp,
  Recycle,
  Leaf,
  Droplet,
  TreesIcon as Tree,
  ChevronRight,
  Bell,
  User,
  Gift,
  Wallet,
  BookOpen,
  Star,
  Flame,
  Sparkles,
  Truck,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { PointsDisplay } from '@/components/user/PointsDisplay';
import { ImpactStats } from '@/components/user/ImpactStats';
import { PickupCard } from '@/components/user/PickupCard';
import { WasteCategoryCard } from '@/components/user/WasteCategoryCard';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { WASTE_TYPES } from '@/lib/constants';
import { PickupRequest, WasteType } from '@/lib/types';
import { formatDate, formatPoints } from '@/lib/utils';

// Mock data - replace with real data from API
const mockUser = {
  id: 'U001',
  name: 'John Doe',
  points: 3450,
  streak: 12,
  level: 'Gold Sorter',
  rank: 42,
  stats: {
    totalRecycled: 245.5,
    treesSaved: 12,
    waterSaved: 1500,
    co2Prevented: 65,
    pickupsCompleted: 24,
    thisMonth: 45.2
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
    driver: {
      name: 'Segun Adeleke',
      phone: '08031234567',
      eta: '15 mins'
    }
  } as any,
  recentActivity: [
    { id: 1, type: 'pickup', description: 'Pickup completed', points: 270, date: '2 days ago', weight: '7.2 kg' },
    { id: 2, type: 'bonus', description: 'Perfect sorting bonus', points: 50, date: '2 days ago' },
    { id: 3, type: 'pickup', description: 'Pickup completed', points: 150, date: '5 days ago', weight: '8.5 kg' },
    { id: 4, type: 'reward', description: 'Redeemed movie ticket', points: -500, date: '1 week ago' },
  ],
  achievements: [
    { id: 1, name: 'Perfect Week', icon: '🌟', progress: 5, target: 7, completed: false },
    { id: 2, name: 'Eco Warrior', icon: '🌍', progress: 245, target: 500, completed: false },
    { id: 3, name: 'Gold Sorter', icon: '🥇', progress: 8, target: 10, completed: false },
  ],
  quickActions: [
    { id: 'schedule', label: 'Schedule Pickup', icon: Plus, color: 'bg-blue-500', href: '/user/schedule' },
    { id: 'dropoff', label: 'Find Drop-off', icon: MapPin, color: 'bg-green-500', href: '/user/dropoff' },
    { id: 'wallet', label: 'My Wallet', icon: Wallet, color: 'bg-purple-500', href: '/user/wallet' },
    { id: 'rewards', label: 'Rewards', icon: Gift, color: 'bg-orange-500', href: '/user/rewards' },
    { id: 'education', label: 'Learn', icon: BookOpen, color: 'bg-pink-500', href: '/user/education' },
  ]
};

export default function UserDashboardPage() {
  const router = useRouter();
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1976D2] to-[#0D47A1] rounded-full flex items-center justify-center text-white font-bold text-lg">
                {mockUser.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h1 className="text-lg font-semibold">Welcome back, {mockUser.name.split(' ')[0]}!</h1>
                <div className="flex items-center gap-2 text-xs">
                  <Badge variant="gold" className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {mockUser.level}
                  </Badge>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">Rank #{mockUser.rank}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/user/notifications">
                <Button variant="ghost" size="sm" className="relative p-2">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </Button>
              </Link>
              <Link href="/user/profile">
                <Button variant="ghost" size="sm" className="p-2">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-24">
        {/* Welcome Banner */}
        {showWelcome && (
          <Card className="mb-6 bg-gradient-to-r from-[#1976D2] to-[#0D47A1] text-white overflow-hidden">
            <CardContent className="p-4 relative">
              <button 
                onClick={() => setShowWelcome(false)}
                className="absolute top-2 right-2 text-white/60 hover:text-white"
              >
                ✕
              </button>
              <div className="flex items-start gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h2 className="font-bold mb-1">You're on a {mockUser.streak}-day streak! 🔥</h2>
                  <p className="text-sm text-white/80 mb-2">
                    Complete 3 more pickups this week to unlock bonus points
                  </p>
                  <Button variant="secondary" size="sm" className="bg-white/20 text-white hover:bg-white/30 border-0">
                    View Challenges
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Points Display - Clickable - Now handled inside PointsDisplay */}
        <PointsDisplay points={mockUser.points} showActions={false} />

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-5 gap-2 mb-6">
          {mockUser.quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.id} href={action.href} className="block">
                <div className="flex flex-col items-center p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group">
                  <div className={`w-10 h-10 ${action.color} rounded-full flex items-center justify-center text-white mb-1 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-center font-medium text-gray-700">{action.label}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Next Pickup - Clickable */}
            {mockUser.nextPickup && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Truck className="w-5 h-5 text-[#1976D2]" />
                    Next Pickup
                  </h2>
                  <Link href="/user/pickups" className="text-sm text-[#1976D2] hover:underline flex items-center gap-1">
                    View all <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <Link href={`/user/pickups/${mockUser.nextPickup.id}`} className="block">
                  <div className="transform transition-transform hover:scale-[1.01] active:scale-[0.99]">
                    <PickupCard pickup={mockUser.nextPickup} />
                  </div>
                </Link>
              </div>
            )}

            {/* Impact Stats - Clickable */}
            <Link href="/user/impact" className="block">
              <div className="transform transition-transform hover:scale-[1.01] active:scale-[0.99]">
                <ImpactStats 
                  totalRecycled={mockUser.stats.totalRecycled}
                  treesSaved={mockUser.stats.treesSaved}
                  waterSaved={mockUser.stats.waterSaved}
                  co2Prevented={mockUser.stats.co2Prevented}
                />
              </div>
            </Link>

            {/* Popular Categories - Clickable */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Recycle className="w-5 h-5 text-[#1976D2]" />
                  Popular Categories
                </h2>
                <Link href="/user/education" className="text-sm text-[#1976D2] hover:underline flex items-center gap-1">
                  Learn more <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {WASTE_TYPES.slice(0, 4).map((waste) => (
                  <Link key={waste.id} href={`/user/education?category=${waste.id}`} className="block">
                    <div className="transform transition-transform hover:scale-[1.02] active:scale-[0.98]">
                      <WasteCategoryCard
                        wasteType={waste as WasteType}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Activity - Clickable */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#1976D2]" />
                    Recent Activity
                  </CardTitle>
                  <Link href="/user/wallet/transactions" className="text-sm text-[#1976D2] hover:underline flex items-center gap-1">
                    View all <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockUser.recentActivity.map((activity, i) => (
                    <Link key={i} href="/user/wallet/transactions" className="block">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            activity.type === 'pickup' ? 'bg-green-100' :
                            activity.type === 'bonus' ? 'bg-purple-100' :
                            activity.type === 'reward' ? 'bg-orange-100' : 'bg-blue-100'
                          }`}>
                            {activity.type === 'pickup' && '♻️'}
                            {activity.type === 'bonus' && '🎁'}
                            {activity.type === 'reward' && '🎫'}
                          </div>
                          <div>
                            <p className="font-medium">{activity.description}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>{activity.date}</span>
                              {activity.weight && (
                                <>
                                  <span>•</span>
                                  <span>{activity.weight}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <span className={`font-semibold ${
                          activity.points > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {activity.points > 0 ? '+' : ''}{activity.points} pts
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Streak Card - Clickable */}
            <Link href="/user/challenges" className="block">
              <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white transform transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Flame className="w-6 h-6" />
                      <span className="font-bold">{mockUser.streak} Day Streak</span>
                    </div>
                    <ArrowRight className="w-5 h-5 opacity-75" />
                  </div>
                  <p className="text-sm text-white/80 mb-3">Keep it up! 3 more days for bonus</p>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white rounded-full h-2 w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Monthly Progress */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Monthly Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Progress</span>
                  <span className="font-bold">{mockUser.stats.thisMonth} kg / 100 kg</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div className="bg-[#1976D2] rounded-full h-2.5" style={{ width: '45%' }}></div>
                </div>
                <Link href="/user/stats">
                  <Button variant="outline" size="sm" fullWidth className="gap-2">
                    <Calendar className="w-4 h-4" />
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Achievements - Clickable */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#1976D2]" />
                    Achievements
                  </CardTitle>
                  <Link href="/user/achievements" className="text-xs text-[#1976D2] hover:underline">
                    View all
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockUser.achievements.map((achievement) => (
                  <Link key={achievement.id} href="/user/achievements" className="block">
                    <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-lg">{achievement.icon}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{achievement.name}</p>
                          <span className="text-xs text-gray-500">{achievement.progress}/{achievement.target}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div 
                            className="bg-[#1976D2] rounded-full h-1.5" 
                            style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Quick Tips - Clickable */}
            <Link href="/user/education" className="block">
              <Card className="bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#1976D2] p-2 rounded-lg">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">Quick Tip</h3>
                      <p className="text-sm text-gray-600">Rinse containers for 1.2x points! ✨</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Referral Card - Clickable */}
            <Link href="/user/referrals" className="block">
              <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white transform transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold">Refer a Friend</h3>
                    <Gift className="w-5 h-5" />
                  </div>
                  <p className="text-sm text-white/80 mb-3">Get 50 points for each friend who joins</p>
                  <Button variant="secondary" size="sm" className="bg-white/20 text-white hover:bg-white/30 border-0 w-full">
                    Invite Now
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4">
        <div className="flex justify-around">
          <Link href="/user/dashboard" className="flex flex-col items-center text-[#1976D2]">
            <div className="w-6 h-6 flex items-center justify-center">🏠</div>
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/user/schedule" className="flex flex-col items-center text-gray-400 hover:text-[#1976D2]">
            <div className="w-6 h-6 flex items-center justify-center">📅</div>
            <span className="text-xs">Schedule</span>
          </Link>
          <Link href="/user/wallet" className="flex flex-col items-center text-gray-400 hover:text-[#1976D2]">
            <div className="w-6 h-6 flex items-center justify-center">💰</div>
            <span className="text-xs">Wallet</span>
          </Link>
          <Link href="/user/rewards" className="flex flex-col items-center text-gray-400 hover:text-[#1976D2]">
            <div className="w-6 h-6 flex items-center justify-center">🎁</div>
            <span className="text-xs">Rewards</span>
          </Link>
          <Link href="/user/profile" className="flex flex-col items-center text-gray-400 hover:text-[#1976D2]">
            <div className="w-6 h-6 flex items-center justify-center">👤</div>
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>

      {/* Floating Action Button for Quick Pickup */}
      <Link href="/user/schedule">
        <button className="fixed right-4 bottom-20 lg:bottom-4 w-14 h-14 bg-[#1976D2] rounded-full shadow-lg flex items-center justify-center text-white hover:bg-[#1565C0] transition-colors z-20">
          <Plus className="w-6 h-6" />
        </button>
      </Link>
    </div>
  );
}