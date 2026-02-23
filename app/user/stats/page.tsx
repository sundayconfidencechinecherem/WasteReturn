'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  TrendingUp,
  Calendar,
  BarChart3,
  PieChart,
  Download,
  ChevronDown,
  Award,
  Flame,
  Target,
  Clock,
  Leaf,
  Droplet,
  TreesIcon as Tree,
  Wind,
  Recycle,
  Star,
  Zap,
  Globe,
  Heart,
  Activity,
  Percent,
  Weight,
  Package,
  Truck,
  Users,
  Crown,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

// Mock stats data
const mockStats = {
  overview: {
    totalRecycled: 245.5,
    totalPickups: 24,
    totalPoints: 3450,
    averagePerPickup: 143.75,
    sortingAccuracy: 92,
    currentStreak: 12,
    longestStreak: 15,
    co2Prevented: 613.75,
    waterSaved: 12275,
    treesSaved: 12,
    energySaved: 980,
    landfillSpace: 1.2,
    communityRank: 42,
    topPercentile: 15
  },
  
  monthly: [
    { month: 'Jan', amount: 18.5, pickups: 2, points: 450 },
    { month: 'Feb', amount: 22.3, pickups: 3, points: 520 },
    { month: 'Mar', amount: 19.8, pickups: 2, points: 480 },
    { month: 'Apr', amount: 25.1, pickups: 3, points: 620 },
    { month: 'May', amount: 28.4, pickups: 4, points: 710 },
    { month: 'Jun', amount: 32.7, pickups: 4, points: 820 },
    { month: 'Jul', amount: 35.2, pickups: 5, points: 880 },
    { month: 'Aug', amount: 30.5, pickups: 4, points: 760 },
    { month: 'Sep', amount: 0, pickups: 0, points: 0 },
    { month: 'Oct', amount: 0, pickups: 0, points: 0 },
    { month: 'Nov', amount: 0, pickups: 0, points: 0 },
    { month: 'Dec', amount: 0, pickups: 0, points: 0 }
  ],
  
  categories: [
    { name: 'Plastics', amount: 85.3, percentage: 35, points: 2130, color: '#1976D2' },
    { name: 'Paper', amount: 62.1, percentage: 25, points: 930, color: '#4CAF50' },
    { name: 'Glass', amount: 41.2, percentage: 17, points: 410, color: '#FFC107' },
    { name: 'Metals', amount: 32.5, percentage: 13, points: 1625, color: '#9C27B0' },
    { name: 'Electronics', amount: 24.4, percentage: 10, points: 1220, color: '#FF5722' }
  ],
  
  quality: [
    { level: 'Gold', count: 8, percentage: 33, multiplier: 1.5 },
    { level: 'Silver', count: 10, percentage: 42, multiplier: 1.3 },
    { level: 'Bronze', count: 4, percentage: 17, multiplier: 1.1 },
    { level: 'Mixed', count: 2, percentage: 8, multiplier: 1.0 },
    { level: 'Contaminated', count: 0, percentage: 0, multiplier: 0.5 }
  ],
  
  achievements: [
    { name: 'Eco Warrior', progress: 245, target: 500, unit: 'kg' },
    { name: 'Streak Master', progress: 12, target: 30, unit: 'days' },
    { name: 'Gold Sorter', progress: 8, target: 10, unit: 'times' },
    { name: 'Tree Planter', progress: 12, target: 20, unit: 'trees' }
  ],
  
  comparisons: {
    vsAverage: {
      recycling: '+22%',
      points: '+18%',
      streak: '+5 days',
      rank: 'Top 15%'
    },
    vsTop: {
      recycling: '245.5 kg vs 850 kg',
      points: '3,450 vs 12,000',
      streak: '12 vs 45 days'
    }
  },
  
  predictions: {
    nextMonth: 38.5,
    nextQuarter: 115.2,
    nextYear: 480,
    achievementETA: '2 weeks'
  }
};

export default function StatsPage() {
  const [timeRange, setTimeRange] = useState<'6m' | '1y' | 'all'>('6m');
  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleExport = (format: 'csv' | 'pdf' | 'json') => {
    console.log(`Exporting as ${format}...`);
    setShowExportMenu(false);
    
    // Generate CSV
    if (format === 'csv') {
      const headers = ['Metric', 'Value', 'Unit'];
      const data = [
        ['Total Recycled', mockStats.overview.totalRecycled, 'kg'],
        ['Total Pickups', mockStats.overview.totalPickups, ''],
        ['Total Points', mockStats.overview.totalPoints, ''],
        ['CO₂ Prevented', mockStats.overview.co2Prevented, 'kg'],
        ['Water Saved', mockStats.overview.waterSaved, 'L'],
        ['Trees Saved', mockStats.overview.treesSaved, ''],
        ['Energy Saved', mockStats.overview.energySaved, 'kWh'],
        ['Landfill Space', mockStats.overview.landfillSpace, 'm³']
      ];
      
      const csvContent = [
        headers.join(','),
        ...data.map(row => row.join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `stats-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
    }
  };

  const getFilteredData = () => {
    if (timeRange === '6m') {
      return mockStats.monthly.slice(2, 8); // Mar-Aug
    } else if (timeRange === '1y') {
      return mockStats.monthly.slice(0, 8); // Jan-Aug
    }
    return mockStats.monthly; // All
  };

  const maxMonthlyValue = Math.max(...mockStats.monthly.map(m => m.amount));

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
                <h1 className="text-xl font-bold">Your Statistics</h1>
                <p className="text-sm text-gray-500">Track your recycling impact</p>
              </div>
            </div>
            
            {/* Export Button */}
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Export
                <ChevronDown className="w-4 h-4" />
              </Button>
              
              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                  {['csv', 'pdf', 'json'].map((format) => (
                    <button
                      key={format}
                      onClick={() => handleExport(format as any)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg capitalize"
                    >
                      Export as {format.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-24">
        {/* Key Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Weight className="w-5 h-5 text-blue-600" />
                </div>
                <Badge variant="default" className="bg-green-100 text-green-700">
                  +22% vs avg
                </Badge>
              </div>
              <p className="text-2xl font-bold">{mockStats.overview.totalRecycled} kg</p>
              <p className="text-xs text-gray-500">Total Recycled</p>
              <p className="text-xs text-green-600 mt-1">↑ {mockStats.overview.averagePerPickup} kg per pickup</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Leaf className="w-5 h-5 text-green-600" />
                </div>
                <Badge variant="default" className="bg-green-100 text-green-700">
                  {mockStats.overview.treesSaved} trees
                </Badge>
              </div>
              <p className="text-2xl font-bold">{mockStats.overview.co2Prevented} kg</p>
              <p className="text-xs text-gray-500">CO₂ Prevented</p>
              <p className="text-xs text-green-600 mt-1">🌍 Equivalent to planting {mockStats.overview.treesSaved} trees</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Flame className="w-5 h-5 text-yellow-600" />
                </div>
                <Badge variant="warning" className="bg-orange-100 text-orange-700">
                  Best: {mockStats.overview.longestStreak}
                </Badge>
              </div>
              <p className="text-2xl font-bold">{mockStats.overview.currentStreak} days</p>
              <p className="text-xs text-gray-500">Current Streak</p>
              <p className="text-xs text-gray-500 mt-1">🔥 Keep it going!</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Crown className="w-5 h-5 text-purple-600" />
                </div>
                <Badge variant="gold" className="bg-yellow-100 text-yellow-700">
                  Top {mockStats.overview.topPercentile}%
                </Badge>
              </div>
              <p className="text-2xl font-bold">#{mockStats.overview.communityRank}</p>
              <p className="text-xs text-gray-500">Community Rank</p>
              <p className="text-xs text-purple-600 mt-1">🏆 Top {mockStats.overview.topPercentile}% of users</p>
            </CardContent>
          </Card>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recycling Trends</h2>
          <div className="flex gap-2">
            {[
              { value: '6m', label: '6 Months' },
              { value: '1y', label: '1 Year' },
              { value: 'all', label: 'All Time' }
            ].map((range) => (
              <Button
                key={range.value}
                variant={timeRange === range.value ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setTimeRange(range.value as any)}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Monthly Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#1976D2]" />
              Monthly Recycling
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {getFilteredData().map((month, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-blue-100 rounded-t-lg relative group">
                    <div 
                      className="bg-[#1976D2] rounded-t-lg transition-all duration-300 group-hover:opacity-80"
                      style={{ height: `${(month.amount / maxMonthlyValue) * 200}px` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {month.amount} kg • {month.points} pts
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-600">{month.month}</span>
                  <span className="text-xs font-medium">{month.pickups}</span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between mt-4 text-sm text-gray-500">
              <span>Total: {getFilteredData().reduce((sum, m) => sum + m.amount, 0).toFixed(1)} kg</span>
              <span>Avg: {(getFilteredData().reduce((sum, m) => sum + m.amount, 0) / getFilteredData().filter(m => m.amount > 0).length).toFixed(1)} kg/month</span>
            </div>
          </CardContent>
        </Card>

        {/* Main Stats Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <PieChart className="w-5 h-5 text-[#1976D2]" />
                Waste Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockStats.categories.map((cat) => (
                <div key={cat.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-sm font-medium">{cat.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">{cat.amount} kg</span>
                      <span className="text-xs text-gray-500 ml-2">({cat.percentage}%)</span>
                    </div>
                  </div>
                  <Progress value={cat.percentage} className="h-2" />
                  <p className="text-xs text-yellow-600 mt-1">+{cat.points} points</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Sorting Quality */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="w-5 h-5 text-[#1976D2]" />
                Sorting Quality
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockStats.quality.map((item) => (
                <div key={item.level}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{item.level}</span>
                      {item.multiplier > 1 && (
                        <Badge variant="gold" className="text-xs">
                          {item.multiplier}x
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">{item.count}</span>
                      <span className="text-xs text-gray-500 ml-2">({item.percentage}%)</span>
                    </div>
                  </div>
                  <Progress 
                    value={item.percentage} 
                    className={`h-2 ${
                      item.level === 'Gold' ? 'bg-yellow-100' :
                      item.level === 'Silver' ? 'bg-gray-200' :
                      item.level === 'Bronze' ? 'bg-orange-100' : 'bg-gray-100'
                    }`}
                    indicatorClassName={
                      item.level === 'Gold' ? 'bg-yellow-500' :
                      item.level === 'Silver' ? 'bg-gray-400' :
                      item.level === 'Bronze' ? 'bg-orange-500' : 'bg-gray-500'
                    }
                  />
                </div>
              ))}
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Overall Accuracy</span>
                  <span className="text-xl font-bold text-green-600">{mockStats.overview.sortingAccuracy}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Environmental Impact */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#1976D2]" />
              Environmental Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Droplet className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <p className="text-2xl font-bold text-blue-600">{(mockStats.overview.waterSaved / 1000).toFixed(1)}k L</p>
                <p className="text-xs text-gray-600">Water Saved</p>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Tree className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <p className="text-2xl font-bold text-green-600">{mockStats.overview.treesSaved}</p>
                <p className="text-xs text-gray-600">Trees Saved</p>
              </div>
              
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                <p className="text-2xl font-bold text-yellow-600">{mockStats.overview.energySaved} kWh</p>
                <p className="text-xs text-gray-600">Energy Saved</p>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Package className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                <p className="text-2xl font-bold text-purple-600">{mockStats.overview.landfillSpace} m³</p>
                <p className="text-xs text-gray-600">Landfill Space</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements Progress */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-[#1976D2]" />
              Achievement Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockStats.achievements.map((achievement, index) => {
                const progress = (achievement.progress / achievement.target) * 100;
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{achievement.name}</span>
                      <span className="text-sm text-gray-600">{achievement.progress}/{achievement.target} {achievement.unit}</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Comparison & Predictions */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* vs Community */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-[#1976D2]" />
                vs Community
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">Recycling vs Average</span>
                <Badge variant="success" className="text-green-700">
                  {mockStats.comparisons.vsAverage.recycling}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">Points vs Average</span>
                <Badge variant="success" className="text-green-700">
                  {mockStats.comparisons.vsAverage.points}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">Streak vs Average</span>
                <Badge variant="success" className="text-green-700">
                  {mockStats.comparisons.vsAverage.streak}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">Global Rank</span>
                <Badge variant="gold" className="text-yellow-700">
                  {mockStats.comparisons.vsAverage.rank}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Predictions */}
          <Card className="bg-gradient-to-br from-[#1976D2] to-[#0D47A1] text-white">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-white">
                <Sparkles className="w-5 h-5" />
                Projections
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm opacity-90">Next Month</p>
                <p className="text-3xl font-bold">{mockStats.predictions.nextMonth} kg</p>
                <p className="text-xs opacity-75">Estimated recycling</p>
              </div>
              
              <div>
                <p className="text-sm opacity-90">Next Quarter</p>
                <p className="text-3xl font-bold">{mockStats.predictions.nextQuarter} kg</p>
                <p className="text-xs opacity-75">Projected total</p>
              </div>
              
              <div>
                <p className="text-sm opacity-90">Next Achievement</p>
                <p className="text-lg font-semibold">Eco Warrior</p>
                <p className="text-xs opacity-75">ETA: {mockStats.predictions.achievementETA}</p>
              </div>
              
              <Progress value={65} className="h-2 bg-white/20" indicatorClassName="bg-white" />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}