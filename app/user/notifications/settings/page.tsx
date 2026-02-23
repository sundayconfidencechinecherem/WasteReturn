// app/user/notifications/settings/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Clock,
  Calendar,
  AlertCircle,
  Award,
  Truck,
  Gift,
  Settings as SettingsIcon,
  Save,
  BellRing,
  BellOff,
  Volume2,
  Vibrate
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { toast } from 'react-hot-toast';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  push: boolean;
  email: boolean;
  sms: boolean;
  category: 'pickup' | 'points' | 'promo' | 'system';
}

export default function NotificationSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'pickup_reminders',
      title: 'Pickup Reminders',
      description: 'Get notified before your scheduled pickup',
      push: true,
      email: true,
      sms: true,
      category: 'pickup'
    },
    {
      id: 'pickup_updates',
      title: 'Pickup Status Updates',
      description: 'Real-time updates when driver is en route or arriving',
      push: true,
      email: false,
      sms: true,
      category: 'pickup'
    },
    {
      id: 'points_earned',
      title: 'Points Earned',
      description: 'Instant notification when you earn points',
      push: true,
      email: true,
      sms: false,
      category: 'points'
    },
    {
      id: 'points_expiry',
      title: 'Points Expiry',
      description: 'Reminder when your points are about to expire',
      push: true,
      email: true,
      sms: true,
      category: 'points'
    },
    {
      id: 'rewards_available',
      title: 'New Rewards',
      description: 'Alert when new rewards are available',
      push: true,
      email: true,
      sms: false,
      category: 'promo'
    },
    {
      id: 'promo_offers',
      title: 'Promotional Offers',
      description: 'Special bonus offers and promotions',
      push: false,
      email: true,
      sms: false,
      category: 'promo'
    },
    {
      id: 'system_updates',
      title: 'System Updates',
      description: 'App updates and new features',
      push: true,
      email: false,
      sms: false,
      category: 'system'
    },
    {
      id: 'security_alerts',
      title: 'Security Alerts',
      description: 'Important security notifications',
      push: true,
      email: true,
      sms: true,
      category: 'system'
    }
  ]);

  const [quietHours, setQuietHours] = useState({
    enabled: true,
    start: '22:00',
    end: '08:00'
  });

  const [channels, setChannels] = useState({
    push: true,
    email: true,
    sms: true,
    whatsapp: false
  });

  const handleToggle = (id: string, channel: 'push' | 'email' | 'sms') => {
    setSettings(settings.map(setting => 
      setting.id === id 
        ? { ...setting, [channel]: !setting[channel] }
        : setting
    ));
  };

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Notification preferences saved!');
    }, 1500);
  };

  const handleToggleAll = (enable: boolean) => {
    setSettings(settings.map(setting => ({
      ...setting,
      push: enable,
      email: enable,
      sms: enable
    })));
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'pickup': return <Truck className="w-5 h-5" />;
      case 'points': return <Award className="w-5 h-5" />;
      case 'promo': return <Gift className="w-5 h-5" />;
      case 'system': return <SettingsIcon className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'pickup': return 'text-blue-500 bg-blue-100';
      case 'points': return 'text-green-500 bg-green-100';
      case 'promo': return 'text-purple-500 bg-purple-100';
      case 'system': return 'text-gray-500 bg-gray-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/user/notifications">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-semibold">Notification Settings</h1>
            </div>
            <Button 
              variant="primary" 
              size="sm" 
              onClick={handleSave}
              isLoading={isLoading}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Quick Actions */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BellRing className="w-5 h-5 text-green-500" />
                <span className="font-medium">Enable all notifications</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleToggleAll(true)}>
                Enable All
              </Button>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <BellOff className="w-5 h-5 text-gray-400" />
                <span className="font-medium">Disable all notifications</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleToggleAll(false)}>
                Disable All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Channels */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Notification Channels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-gray-500">Receive alerts on your device</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={channels.push}
                  onChange={() => setChannels({ ...channels, push: !channels.push })}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1976D2]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500">john.doe@example.com</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={channels.email}
                  onChange={() => setChannels({ ...channels, email: !channels.email })}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1976D2]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-sm text-gray-500">0803****567</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={channels.sms}
                  onChange={() => setChannels({ ...channels, sms: !channels.sms })}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1976D2]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">WhatsApp</p>
                  <p className="text-sm text-gray-500">Coming soon</p>
                </div>
              </div>
              <Badge variant="default">Soon</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quiet Hours */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Quiet Hours</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Do Not Disturb</p>
                  <p className="text-sm text-gray-500">Mute notifications during selected hours</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={quietHours.enabled}
                  onChange={() => setQuietHours({ ...quietHours, enabled: !quietHours.enabled })}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1976D2]"></div>
              </label>
            </div>

            {quietHours.enabled && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Start Time</label>
                  <input 
                    type="time" 
                    value={quietHours.start}
                    onChange={(e) => setQuietHours({ ...quietHours, start: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">End Time</label>
                  <input 
                    type="time" 
                    value={quietHours.end}
                    onChange={(e) => setQuietHours({ ...quietHours, end: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notification Preferences by Category */}
        {['pickup', 'points', 'promo', 'system'].map((category) => {
          const categorySettings = settings.filter(s => s.category === category);
          const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
          
          return (
            <Card key={category} className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getCategoryColor(category)}`}>
                    {getCategoryIcon(category)}
                  </div>
                  <CardTitle>{categoryName} Notifications</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {categorySettings.map((setting) => (
                  <div key={setting.id} className="pb-4 border-b last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium">{setting.title}</p>
                        <p className="text-sm text-gray-500">{setting.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 mt-3">
                      {channels.push && (
                        <label className="flex items-center gap-2 text-sm">
                          <input 
                            type="checkbox"
                            checked={setting.push}
                            onChange={() => handleToggle(setting.id, 'push')}
                            className="rounded text-[#1976D2]"
                          />
                          <span>Push</span>
                        </label>
                      )}
                      
                      {channels.email && (
                        <label className="flex items-center gap-2 text-sm">
                          <input 
                            type="checkbox"
                            checked={setting.email}
                            onChange={() => handleToggle(setting.id, 'email')}
                            className="rounded text-[#1976D2]"
                          />
                          <span>Email</span>
                        </label>
                      )}
                      
                      {channels.sms && (
                        <label className="flex items-center gap-2 text-sm">
                          <input 
                            type="checkbox"
                            checked={setting.sms}
                            onChange={() => handleToggle(setting.id, 'sms')}
                            className="rounded text-[#1976D2]"
                          />
                          <span>SMS</span>
                        </label>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}

        {/* Additional Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Additional Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Sound</p>
                  <p className="text-sm text-gray-500">Play sound for notifications</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1976D2]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Vibrate className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Vibrate</p>
                  <p className="text-sm text-gray-500">Vibrate on notification</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1976D2]"></div>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Save Button (Mobile) */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden">
          <Button 
            variant="primary" 
            size="lg" 
            fullWidth
            onClick={handleSave}
            isLoading={isLoading}
            className="gap-2"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </Button>
        </div>
      </main>
    </div>
  );
}