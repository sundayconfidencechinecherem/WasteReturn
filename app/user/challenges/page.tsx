'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Trophy,
  Medal,
  Star,
  Flame,
  Target,
  TrendingUp,
  Calendar,
  Clock,
  Users,
  Gift,
  Award,
  ChevronRight,
  Sparkles,
  Zap,
  Leaf,
  Recycle,
  Droplet,
  CheckCircle,
  Lock,
  Gem,
  Crown,
  Rocket,
  PartyPopper
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';

// Mock challenges data
const mockChallenges = {
  active: [
    {
      id: 1,
      title: '7-Day Streak',
      description: 'Complete a pickup every day for 7 days',
      category: 'streak',
      icon: '🔥',
      progress: 5,
      target: 7,
      daysLeft: 3,
      reward: {
        points: 500,
        badge: 'Streak Master',
        badgeIcon: '🏆'
      },
      participants: 234,
      completed: 0,
      difficulty: 'medium'
    },
    {
      id: 2,
      title: 'Plastic Free February',
      description: 'Recycle 50kg of plastic this month',
      category: 'recycling',
      icon: '🧴',
      progress: 32,
      target: 50,
      daysLeft: 12,
      reward: {
        points: 750,
        badge: 'Plastic Warrior',
        badgeIcon: '♻️'
      },
      participants: 567,
      completed: 89,
      difficulty: 'hard'
    },
    {
      id: 3,
      title: 'Early Bird Special',
      description: 'Complete 5 morning pickups',
      category: 'special',
      icon: '🌅',
      progress: 3,
      target: 5,
      daysLeft: 5,
      reward: {
        points: 300,
        badge: 'Early Riser',
        badgeIcon: '☀️'
      },
      participants: 123,
      completed: 45,
      difficulty: 'easy'
    }
  ],
  
  upcoming: [
    {
      id: 4,
      title: 'Glass Crusher',
      description: 'Recycle 30kg of glass',
      category: 'recycling',
      icon: '🥃',
      startsIn: '2 days',
      reward: {
        points: 400,
        badge: 'Glass Master'
      },
      difficulty: 'medium'
    },
    {
      id: 5,
      title: 'Community Champion',
      description: 'Refer 5 friends to WasteReturn',
      category: 'social',
      icon: '👥',
      startsIn: '5 days',
      reward: {
        points: 1000,
        badge: 'Community Hero'
      },
      difficulty: 'hard'
    }
  ],
  
  completed: [
    {
      id: 6,
      title: 'Eco Starter',
      description: 'Complete first 10 pickups',
      icon: '🌱',
      completedDate: '2026-02-15',
      reward: {
        points: 200,
        badge: 'Eco Starter'
      }
    },
    {
      id: 7,
      title: 'Weekend Warrior',
      description: 'Complete pickups on 3 weekends',
      icon: '🎯',
      completedDate: '2026-02-10',
      reward: {
        points: 350,
        badge: 'Weekend Warrior'
      }
    }
  ],
  
  leaderboard: [
    { rank: 1, name: 'EcoWarrior', points: 2450, avatar: '👑', badge: 'King' },
    { rank: 2, name: 'GreenQueen', points: 2320, avatar: '👸', badge: 'Queen' },
    { rank: 3, name: 'RecycleKing', points: 2180, avatar: '🏆', badge: 'Champion' },
    { rank: 4, name: 'PlasticFree', points: 1950, avatar: '🌟', badge: 'Rising Star' },
    { rank: 5, name: 'EarthLover', points: 1820, avatar: '🌍', badge: 'Eco Hero' },
    { rank: 6, name: 'You', points: 1750, avatar: '⭐', badge: 'Your Rank', isCurrentUser: true },
    { rank: 7, name: 'GreenThumb', points: 1680, avatar: '🌿', badge: 'Green' },
    { rank: 8, name: 'CleanCity', points: 1540, avatar: '🏙️', badge: 'City Cleaner' },
    { rank: 9, name: 'ZeroWaste', points: 1420, avatar: '🔄', badge: 'Zero Hero' },
    { rank: 10, name: 'EcoFriendly', points: 1380, avatar: '💚', badge: 'Friendly' }
  ],
  
  stats: {
    totalChallenges: 24,
    completedChallenges: 12,
    activeChallenges: 3,
    totalPoints: 3450,
    globalRank: 156,
    topPercentile: 15
  }
};

const difficultyColors = {
  easy: 'bg-green-100 text-green-700 border-green-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  hard: 'bg-red-100 text-red-700 border-red-200'
};

export default function ChallengesPage() {
  const [selectedTab, setSelectedTab] = useState('active');
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const getDifficultyBadge = (difficulty: string) => {
    const colorClass = difficultyColors[difficulty as keyof typeof difficultyColors] || 'bg-gray-100 text-gray-700';
    return (
      <Badge variant="default" className={`${colorClass} border`}>
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </Badge>
    );
  };

  const getProgressColor = (progress: number, target: number) => {
    const percentage = (progress / target) * 100;
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    if (percentage >= 25) return 'bg-orange-500';
    return 'bg-blue-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/user/dashboard">
                <Button variant="ghost" size="sm" className="p-2">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">Challenges</h1>
                <p className="text-sm text-gray-500">Complete challenges to earn rewards</p>
              </div>
            </div>
            
            <Button 
              variant={showLeaderboard ? 'primary' : 'outline'}
              onClick={() => setShowLeaderboard(!showLeaderboard)}
              className="gap-2"
            >
              <Trophy className="w-4 h-4" />
              Leaderboard
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-24">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Trophy className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Global Rank</p>
                  <p className="text-xl font-bold">#{mockChallenges.stats.globalRank}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Completed</p>
                  <p className="text-xl font-bold">{mockChallenges.stats.completedChallenges}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Zap className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Active</p>
                  <p className="text-xl font-bold">{mockChallenges.stats.activeChallenges}</p>
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
                  <p className="text-xs text-gray-500">Total Points</p>
                  <p className="text-xl font-bold">{mockChallenges.stats.totalPoints}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Percentile Badge */}
        <Card className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Crown className="w-8 h-8 opacity-80" />
                <div>
                  <p className="text-sm opacity-90">You're in the top</p>
                  <p className="text-2xl font-bold">{mockChallenges.stats.topPercentile}%</p>
                </div>
              </div>
              <Sparkles className="w-6 h-6 opacity-80" />
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {['active', 'upcoming', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 text-sm font-medium capitalize transition-colors relative ${
                selectedTab === tab
                  ? 'text-[#1976D2] border-b-2 border-[#1976D2]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
              {tab === 'active' && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                  {mockChallenges.active.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Active Challenges */}
        {selectedTab === 'active' && (
          <div className="space-y-4">
            {mockChallenges.active.map((challenge) => {
              const progress = (challenge.progress / challenge.target) * 100;
              
              return (
                <Card key={challenge.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    {/* Progress Bar */}
                    <div className="h-2 bg-gray-100">
                      <div 
                        className={`h-2 ${getProgressColor(challenge.progress, challenge.target)}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className="w-16 h-16 bg-gradient-to-br from-[#1976D2] to-[#0D47A1] rounded-xl flex items-center justify-center text-3xl">
                          {challenge.icon}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{challenge.title}</h3>
                              <p className="text-sm text-gray-500">{challenge.description}</p>
                            </div>
                            {getDifficultyBadge(challenge.difficulty)}
                          </div>
                          
                          {/* Progress */}
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-500">Progress</span>
                              <span className="font-medium">{challenge.progress}/{challenge.target}</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                          </div>
                          
                          {/* Meta Info */}
                          <div className="flex flex-wrap gap-4 mt-3 text-sm">
                            <div className="flex items-center gap-1 text-gray-500">
                              <Clock className="w-4 h-4" />
                              <span>{challenge.daysLeft} days left</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-500">
                              <Users className="w-4 h-4" />
                              <span>{challenge.participants} participants</span>
                            </div>
                            <div className="flex items-center gap-1 text-yellow-600">
                              <Gift className="w-4 h-4" />
                              <span className="font-medium">{challenge.reward.points} pts</span>
                            </div>
                          </div>
                          
                          {/* Badge Preview */}
                          <div className="mt-2">
                            <Badge variant="gold" className="flex items-center gap-1">
                              <span>{challenge.reward.badgeIcon}</span>
                              {challenge.reward.badge}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Button */}
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm" className="gap-2">
                          View Details <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Upcoming Challenges */}
        {selectedTab === 'upcoming' && (
          <div className="space-y-4">
            {mockChallenges.upcoming.map((challenge) => (
              <Card key={challenge.id} className="bg-gray-50/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-2xl opacity-50">
                      {challenge.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{challenge.title}</h3>
                        {getDifficultyBadge(challenge.difficulty)}
                      </div>
                      <p className="text-sm text-gray-500">{challenge.description}</p>
                      
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>Starts in {challenge.startsIn}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-yellow-600">
                          <Gift className="w-4 h-4" />
                          <span>{challenge.reward.points} pts</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" disabled>
                      <Lock className="w-4 h-4 mr-2" />
                      Locked
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Completed Challenges */}
        {selectedTab === 'completed' && (
          <div className="space-y-4">
            {mockChallenges.completed.map((challenge) => (
              <Card key={challenge.id} className="bg-green-50/50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">
                      {challenge.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{challenge.title}</h3>
                        <Badge variant="success">✓ Completed</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{challenge.description}</p>
                      
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>Completed {new Date(challenge.completedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-yellow-600">
                          <Gift className="w-4 h-4" />
                          <span>+{challenge.reward.points} pts</span>
                        </div>
                      </div>
                    </div>
                    
                    <Badge variant="gold" className="flex items-center gap-1">
                      <PartyPopper className="w-3 h-3" />
                      Done
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Leaderboard Modal/Section */}
        {showLeaderboard && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-end lg:items-center justify-center">
            <div className="bg-white w-full lg:w-[600px] lg:rounded-2xl rounded-t-2xl p-4 max-h-[80vh] overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Leaderboard
                </h2>
                <Button variant="ghost" size="sm" onClick={() => setShowLeaderboard(false)}>
                  ✕
                </Button>
              </div>

              {/* Top 3 Podium */}
              <div className="flex items-end justify-center gap-4 mb-6">
                {/* 2nd Place */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-full mx-auto mb-2 flex items-center justify-center text-3xl">
                    {mockChallenges.leaderboard[1].avatar}
                  </div>
                  <div className="font-bold">{mockChallenges.leaderboard[1].name}</div>
                  <div className="text-sm text-gray-500">#{mockChallenges.leaderboard[1].rank}</div>
                  <div className="text-sm font-semibold mt-1">{mockChallenges.leaderboard[1].points} pts</div>
                </div>

                {/* 1st Place */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-t-full mx-auto mb-2 flex items-center justify-center text-4xl relative">
                    {mockChallenges.leaderboard[0].avatar}
                    <Crown className="absolute -top-3 w-6 h-6 text-yellow-500" />
                  </div>
                  <div className="font-bold text-lg">{mockChallenges.leaderboard[0].name}</div>
                  <div className="text-sm text-gray-500">#{mockChallenges.leaderboard[0].rank}</div>
                  <div className="text-sm font-semibold mt-1">{mockChallenges.leaderboard[0].points} pts</div>
                </div>

                {/* 3rd Place */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-b from-orange-300 to-orange-400 rounded-t-full mx-auto mb-2 flex items-center justify-center text-3xl">
                    {mockChallenges.leaderboard[2].avatar}
                  </div>
                  <div className="font-bold">{mockChallenges.leaderboard[2].name}</div>
                  <div className="text-sm text-gray-500">#{mockChallenges.leaderboard[2].rank}</div>
                  <div className="text-sm font-semibold mt-1">{mockChallenges.leaderboard[2].points} pts</div>
                </div>
              </div>

              {/* Leaderboard List */}
              <div className="space-y-2">
                {mockChallenges.leaderboard.map((user) => (
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
                    <Badge variant={user.isCurrentUser ? 'gold' : 'default'} className="text-xs">
                      {user.badge}
                    </Badge>
                    <div className="font-bold">{user.points}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}