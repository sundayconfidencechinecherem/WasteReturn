// app/driver/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Truck,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle,
  Navigation,
  ChevronRight,
  Star,
  Users,
  Award,
  Wifi,
  WifiOff,
  Battery,
  TrendingUp,
  Calendar,
  Bell,
  Menu
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

// Mock data with real-time simulation
const mockDriver = {
  name: 'Segun Adeleke',
  id: 'D001',
  status: 'online',
  todayPickups: 12,
  completedPickups: 8,
  pendingPickups: 4,
  earnings: 12500,
  rating: 4.8,
  batteryLevel: 85,
  nextPickup: {
    id: 'PK003',
    user: 'Peter Okafor',
    address: '8 Bourdillon Rd, Ikoyi',
    time: '2:30 PM',
    distance: '1.2 km',
    duration: '8 mins',
    wasteTypes: ['Plastics', 'Glass'],
    estimatedWeight: '15 kg',
    priority: true
  }
};

const mockPickups = [
  {
    id: 'PK001',
    user: 'John Doe',
    address: '12 Adebayo St, Lekki',
    time: '10:00 AM',
    status: 'completed',
    points: 375,
    weight: 12.5
  },
  {
    id: 'PK002',
    user: 'Mary Jones',
    address: '45 Admiralty Way, Lekki',
    time: '11:30 AM',
    status: 'completed',
    points: 246,
    weight: 8.2
  },
  {
    id: 'PK003',
    user: 'Peter Okafor',
    address: '8 Bourdillon Rd, Ikoyi',
    time: '2:30 PM',
    status: 'pending',
    points: 450,
    weight: 15.0,
    isNext: true
  },
  {
    id: 'PK004',
    user: 'Adaobi Nwosu',
    address: '23 Ajose Adeogun, VI',
    time: '4:00 PM',
    status: 'pending',
    points: 165,
    weight: 5.5
  },
  {
    id: 'PK005',
    user: 'Chidi Eze',
    address: '7 Milverton Rd, Ikoyi',
    time: '5:30 PM',
    status: 'pending',
    points: 294,
    weight: 9.8
  },
];

const mockAlerts = [
  { id: 'A1', message: 'New pickup added to your route', time: '2 mins ago', type: 'info' },
  { id: 'A2', message: 'Customer left special instructions', time: '15 mins ago', type: 'warning' },
];

export default function DriverDashboardPage() {
  const [isOnline, setIsOnline] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAlerts, setShowAlerts] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(mockDriver.batteryLevel);

  // Simulate real-time updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate battery drain
      setBatteryLevel(prev => Math.max(prev - 0.1, 20));
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const completedCount = mockPickups.filter(p => p.status === 'completed').length;
  const pendingCount = mockPickups.filter(p => p.status === 'pending').length;
  const totalEarnings = mockPickups
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.points * 2, 0); // Convert points to naira (approx)

  const getBatteryColor = () => {
    if (batteryLevel > 60) return 'text-green-500';
    if (batteryLevel > 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="lg:hidden">
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1976D2] to-[#0D47A1] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  SA
                </div>
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${
                  isOnline ? 'bg-green-500' : 'bg-gray-400'
                }`}>
                  {isOnline }
                </div>
              </div>
              <div>
                <h1 className="text-lg font-semibold">{mockDriver.name}</h1>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-gray-500">ID: {mockDriver.id}</span>
                  <span className="text-gray-300">|</span>
                  {/* <span className={`flex items-center gap-1 ${getBatteryColor()}`}>
                    <Battery className="w-3 h-3" />
                    {Math.round(batteryLevel)}%
                  </span> */}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <div className="relative">
                <button 
                  className="p-2 hover:bg-gray-100 rounded-full relative"
                  onClick={() => setShowAlerts(!showAlerts)}
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                  {mockAlerts.length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                  )}
                </button>
                
                {/* Alerts dropdown */}
                {showAlerts && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                    <div className="p-3 border-b border-gray-200">
                      <h3 className="font-semibold">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {mockAlerts.map(alert => (
                        <div key={alert.id} className="p-3 hover:bg-gray-50 border-b last:border-0">
                          <p className="text-sm">{alert.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Online/Offline Toggle */}
              <Button 
                variant={isOnline ? 'success' : 'outline'} 
                size="sm"
                onClick={() => setIsOnline(!isOnline)}
                className="min-w-[100px]"
              >
                {isOnline ? '🟢 Online' : '⚪ Offline'}
              </Button>
            </div>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            <div className="text-center">
              <p className="text-xs text-gray-500">Date</p><p className="text-sm font-medium" suppressHydrationWarning>
  {currentTime.toLocaleDateString()}
</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Time</p>
              <p className="text-sm font-medium" suppressHydrationWarning>
  {currentTime.toLocaleTimeString()}
</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Completed</p>
              <p className="text-sm font-medium text-green-600">{completedCount}/{mockPickups.length}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Pending</p>
              <p className="text-sm font-medium text-orange-600">{pendingCount}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-24">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  +{mockDriver.todayPickups}
                </span>
              </div>
              <p className="text-2xl font-bold">{mockDriver.completedPickups}</p>
              <p className="text-xs text-gray-500">Completed Pickups</p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-blue-600 h-1.5 rounded-full" 
                  style={{ width: `${(mockDriver.completedPickups / mockDriver.todayPickups) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                  {mockDriver.pendingPickups} left
                </span>
              </div>
              <p className="text-2xl font-bold">{mockDriver.pendingPickups}</p>
              <p className="text-xs text-gray-500">Pending Pickups</p>
              <p className="text-xs text-gray-400 mt-2">Next in {mockDriver.nextPickup.distance}</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  Today
                </span>
              </div>
              <p className="text-2xl font-bold">₦{totalEarnings.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Today's Earnings</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600">+12% vs yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                  Top 10%
                </span>
              </div>
              <p className="text-2xl font-bold">{mockDriver.rating}</p>
              <p className="text-xs text-gray-500">Driver Rating</p>
              <p className="text-xs text-gray-400 mt-2">from 234 trips</p>
            </CardContent>
          </Card>
        </div>

        {/* Next Pickup - Highlighted Card */}
        {mockDriver.nextPickup && (
          <Card className="mb-6 border-2 border-[#1976D2] bg-gradient-to-r from-blue-50 to-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1976D2] opacity-5 rounded-full -mr-8 -mt-8" />
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#1976D2] rounded-lg">
                    <Navigation className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold">Next Pickup</h2>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="gold">Priority</Badge>
                  <span className="text-sm text-gray-500">in {mockDriver.nextPickup.duration}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="font-semibold text-lg">{mockDriver.nextPickup.user}</p>
                  <div className="flex items-start gap-2 mt-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <p className="text-sm text-gray-600">{mockDriver.nextPickup.address}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium">{mockDriver.nextPickup.time}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm">
                      <Navigation className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium">{mockDriver.nextPickup.distance}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500 mb-2">Waste types:</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {mockDriver.nextPickup.wasteTypes.map((type, i) => (
                        <Badge key={i} variant="default" className="bg-gray-100">
                          {type}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">Est. weight:</p>
                      <p className="font-semibold">{mockDriver.nextPickup.estimatedWeight}</p>
                    </div>
                  </div>
                  
                  <Link href={`/driver/pickups/${mockDriver.nextPickup.id}`}>
                    <Button variant="primary" size="lg" fullWidth className="mt-4 gap-2">
                      <Navigation className="w-5 h-5" />
                      Start Navigation
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Today's Schedule */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#1976D2]" />
                <CardTitle>Today's Schedule</CardTitle>
              </div>
              <Link href="/driver/route">
                <Button variant="ghost" size="sm" className="gap-1">
                  View Route <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockPickups.map((pickup, index) => (
                <div 
                  key={pickup.id} 
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                    pickup.isNext 
                      ? 'bg-blue-50 border border-blue-200' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    pickup.status === 'completed' 
                      ? 'bg-green-100 text-green-600'
                      : pickup.isNext
                      ? 'bg-[#1976D2] text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{pickup.user}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{pickup.time}</span>
                        {pickup.isNext && (
                          <Badge variant="warning" className="text-xs">Next</Badge>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {pickup.address}
                    </p>
                    
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs bg-white px-2 py-1 rounded-full shadow-sm">
                        {pickup.weight} kg
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-purple-600 font-medium">
                        {pickup.points} pts
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      {pickup.status === 'completed' ? (
                        <Badge variant="success" className="text-xs">✓ Completed</Badge>
                      ) : (
                        <Badge variant="warning" className="text-xs">⏳ Pending</Badge>
                      )}
                    </div>
                  </div>

                  {pickup.status === 'pending' && !pickup.isNext && (
                    <Link href={`/driver/pickups/${pickup.id}`}>
                      <Button variant="outline" size="sm" className="whitespace-nowrap">
                        View
                      </Button>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Customers Served</p>
                  <p className="text-2xl font-bold">124</p>
                  <p className="text-xs text-green-600 mt-1">↑ 8 this week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Waste Collected</p>
                  <p className="text-2xl font-bold">2.5t</p>
                  <p className="text-xs text-green-600 mt-1">↑ 0.3t vs yesterday</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">On-time Rate</p>
                  <p className="text-2xl font-bold">98%</p>
                  <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <Link href="/driver/earnings">
            <Button variant="outline" size="lg" fullWidth className="gap-2">
              <DollarSign className="w-5 h-5" />
              View Earnings
            </Button>
          </Link>
          <Link href="/driver/route">
            <Button variant="outline" size="lg" fullWidth className="gap-2">
              <Navigation className="w-5 h-5" />
              View Route
            </Button>
          </Link>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 z-10">
        <div className="flex justify-around items-center">
          <Link href="/driver/dashboard" className="flex flex-col items-center p-2 text-[#1976D2]">
            <span className="text-xl">🏠</span>
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link href="/driver/route" className="flex flex-col items-center p-2 text-gray-400">
            <span className="text-xl">🗺️</span>
            <span className="text-xs mt-1">Route</span>
          </Link>
          <Link href="/driver/earnings" className="flex flex-col items-center p-2 text-gray-400">
            <span className="text-xl">💰</span>
            <span className="text-xs mt-1">Earnings</span>
          </Link>
          <Link href="/driver/settings" className="flex flex-col items-center p-2 text-gray-400">
            <span className="text-xl">⚙️</span>
            <span className="text-xs mt-1">Settings</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}