// app/user/notifications/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Bell,
  CheckCircle,
  Truck,
  Award,
  AlertCircle,
  Info,
  Gift,
  Calendar,
  Clock,
  Settings,
  Check,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatDate, formatTime } from '@/lib/utils';

// Mock notifications
const mockNotifications = [
  {
    id: 'N001',
    type: 'pickup',
    title: 'Pickup Confirmed',
    message: 'Your pickup for tomorrow at 2:30 PM has been confirmed. Driver Segun will arrive soon.',
    time: new Date('2026-02-21T10:30:00'),
    read: false,
    actionUrl: '/user/pickups/PK003',
    icon: Truck
  },
  {
    id: 'N002',
    type: 'points',
    title: 'Points Earned!',
    message: 'You earned 270 points from your recent pickup. Great sorting!',
    time: new Date('2026-02-20T15:45:00'),
    read: false,
    actionUrl: '/user/wallet',
    icon: Award
  },
  {
    id: 'N003',
    type: 'reminder',
    title: 'Pickup Reminder',
    message: 'Your pickup is scheduled for tomorrow at 2:30 PM. Please have your waste ready.',
    time: new Date('2026-02-20T09:00:00'),
    read: true,
    actionUrl: '/user/pickups/PK003',
    icon: Clock
  },
  {
    id: 'N004',
    type: 'reward',
    title: 'New Reward Available',
    message: 'Movie tickets now available for 2,500 points! Redeem before they run out.',
    time: new Date('2026-02-19T14:20:00'),
    read: true,
    actionUrl: '/user/rewards',
    icon: Gift
  },
  {
    id: 'N005',
    type: 'alert',
    title: 'Sorting Tip',
    message: 'Remember to rinse containers for bonus points! Clean items earn 1.2x points.',
    time: new Date('2026-02-18T11:15:00'),
    read: true,
    actionUrl: '/user/education',
    icon: Info
  },
  {
    id: 'N006',
    type: 'system',
    title: 'App Update',
    message: 'New features available! Check out the improved route tracking.',
    time: new Date('2026-02-17T16:00:00'),
    read: true,
    actionUrl: null,
    icon: Bell
  },
];

export default function UserNotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = notifications.filter(n => 
    filter === 'all' || (filter === 'unread' && !n.read)
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getTypeIcon = (type: string, icon: any) => {
    const Icon = icon;
    const colors = {
      pickup: 'text-blue-500 bg-blue-100',
      points: 'text-green-500 bg-green-100',
      reminder: 'text-yellow-500 bg-yellow-100',
      reward: 'text-purple-500 bg-purple-100',
      alert: 'text-orange-500 bg-orange-100',
      system: 'text-gray-500 bg-gray-100',
    };
    const color = colors[type as keyof typeof colors] || colors.system;
    return (
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/user/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold">Notifications</h1>
                <p className="text-sm text-gray-500">{unreadCount} unread</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                Mark all read
              </Button>
              <Link href="/user/notifications/settings">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mt-4">
            {(['all', 'unread'] as const).map((f) => (
              <button
                key={f}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
                  filter === f
                    ? 'bg-[#1976D2] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setFilter(f)}
              >
                {f} {f === 'unread' && `(${unreadCount})`}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {filteredNotifications.length > 0 ? (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`hover:shadow-md transition-shadow ${
                  !notification.read ? 'border-l-4 border-l-[#1976D2]' : ''
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {getTypeIcon(notification.type, notification.icon)}
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className={`font-semibold ${!notification.read ? 'text-[#1976D2]' : ''}`}>
                          {notification.title}
                        </h3>
                        <span className="text-xs text-gray-400">
                          {formatTime(notification.time)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                          {formatDate(notification.time)}
                        </span>
                        <div className="flex gap-2">
                          {!notification.read && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="p-1"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="w-4 h-4 text-green-500" />
                            </Button>
                          )}
                          {notification.actionUrl && (
                            <Link href={notification.actionUrl}>
                              <Button variant="outline" size="sm">View</Button>
                            </Link>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="p-1"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <X className="w-4 h-4 text-gray-400" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-500">
                {filter === 'unread' ? 'You have no unread notifications' : 'You\'re all caught up!'}
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}