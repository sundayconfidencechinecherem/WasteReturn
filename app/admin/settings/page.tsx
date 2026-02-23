// app/admin/settings/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Save,
  Bell,
  Shield,
  DollarSign,
  Globe,
  Mail,
  Lock,
  Users,
  Truck,
  Recycle,
  Sliders,
  Palette,
  Database,
  RefreshCw,
  Key
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'react-hot-toast';

type SettingsTab = 'general' | 'points' | 'notifications' | 'security' | 'system';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [isSaving, setIsSaving] = useState(false);
  
  // General settings
  const [generalSettings, setGeneralSettings] = useState({
    platformName: 'WasteReturn',
    supportEmail: 'support@wastereturn.com',
    supportPhone: '+234 800 123 4567',
    address: '12 Adebayo Street, Lekki Phase 1, Lagos',
    timezone: 'Africa/Lagos',
    currency: 'NGN',
    language: 'English',
  });

  // Points settings
  const [pointsSettings, setPointsSettings] = useState({
    conversionRate: '2', // 2 points = ₦1
    minCashout: '1000',
    maxCashout: '50000',
    pointExpiryDays: '365',
    goldMultiplier: '1.5',
    silverMultiplier: '1.3',
    bronzeMultiplier: '1.1',
    referralBonus: '50',
    signupBonus: '100',
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    pickupReminders: true,
    paymentAlerts: true,
    driverUpdates: true,
    marketingEmails: false,
  });

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    maxLoginAttempts: '5',
    passwordMinLength: '8',
    requireSpecialChar: true,
    requireNumber: true,
    ipWhitelisting: false,
  });

  // System settings
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    debugMode: false,
    apiRateLimit: '1000',
    cacheTimeout: '3600',
    backupFrequency: 'daily',
    dataRetention: '365',
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Settings saved successfully');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-semibold">System Settings</h1>
            </div>
            <Button 
              variant="primary" 
              onClick={handleSave} 
              isLoading={isSaving}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>

          {/* Settings Tabs */}
          <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
            {[
              { id: 'general', label: 'General', icon: Globe },
              { id: 'points', label: 'Points & Rewards', icon: DollarSign },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'security', label: 'Security', icon: Shield },
              { id: 'system', label: 'System', icon: Database },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center gap-2 pb-2 px-1 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-b-2 border-[#1976D2] text-[#1976D2] font-medium'
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab(tab.id as SettingsTab)}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Platform Name
                      </label>
                      <Input
                        value={generalSettings.platformName}
                        onChange={(e) => setGeneralSettings({...generalSettings, platformName: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Support Email
                      </label>
                      <Input
                        type="email"
                        value={generalSettings.supportEmail}
                        onChange={(e) => setGeneralSettings({...generalSettings, supportEmail: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Support Phone
                      </label>
                      <Input
                        value={generalSettings.supportPhone}
                        onChange={(e) => setGeneralSettings({...generalSettings, supportPhone: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Timezone
                      </label>
                      <select 
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                        value={generalSettings.timezone}
                        onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
                      >
                        <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
                        <option value="Africa/Accra">Africa/Accra (GMT)</option>
                        <option value="Africa/Nairobi">Africa/Nairobi (EAT)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Address
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                      value={generalSettings.address}
                      onChange={(e) => setGeneralSettings({...generalSettings, address: e.target.value})}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Currency
                      </label>
                      <select 
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                        value={generalSettings.currency}
                        onChange={(e) => setGeneralSettings({...generalSettings, currency: e.target.value})}
                      >
                        <option value="NGN">Nigerian Naira (₦)</option>
                        <option value="GHS">Ghanaian Cedi (GH₵)</option>
                        <option value="KES">Kenyan Shilling (KSh)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Language
                      </label>
                      <select 
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                        value={generalSettings.language}
                        onChange={(e) => setGeneralSettings({...generalSettings, language: e.target.value})}
                      >
                        <option value="English">English</option>
                        <option value="Yoruba">Yoruba</option>
                        <option value="Hausa">Hausa</option>
                        <option value="Igbo">Igbo</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'points' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Points Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Conversion Rate
                      </label>
                      <div className="flex items-center gap-2">
                        <Input
                          value={pointsSettings.conversionRate}
                          onChange={(e) => setPointsSettings({...pointsSettings, conversionRate: e.target.value})}
                        />
                        <span className="text-sm text-gray-500">pts = ₦1</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Min Cashout (points)
                      </label>
                      <Input
                        value={pointsSettings.minCashout}
                        onChange={(e) => setPointsSettings({...pointsSettings, minCashout: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Max Cashout (points)
                      </label>
                      <Input
                        value={pointsSettings.maxCashout}
                        onChange={(e) => setPointsSettings({...pointsSettings, maxCashout: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Point Expiry (days)
                    </label>
                    <Input
                      value={pointsSettings.pointExpiryDays}
                      onChange={(e) => setPointsSettings({...pointsSettings, pointExpiryDays: e.target.value})}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sorting Multipliers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gold (1.5x)
                      </label>
                      <Input
                        value={pointsSettings.goldMultiplier}
                        onChange={(e) => setPointsSettings({...pointsSettings, goldMultiplier: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Silver (1.3x)
                      </label>
                      <Input
                        value={pointsSettings.silverMultiplier}
                        onChange={(e) => setPointsSettings({...pointsSettings, silverMultiplier: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bronze (1.1x)
                      </label>
                      <Input
                        value={pointsSettings.bronzeMultiplier}
                        onChange={(e) => setPointsSettings({...pointsSettings, bronzeMultiplier: e.target.value})}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bonuses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Referral Bonus
                      </label>
                      <Input
                        value={pointsSettings.referralBonus}
                        onChange={(e) => setPointsSettings({...pointsSettings, referralBonus: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sign-up Bonus
                      </label>
                      <Input
                        value={pointsSettings.signupBonus}
                        onChange={(e) => setPointsSettings({...pointsSettings, signupBonus: e.target.value})}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { id: 'emailNotifications', label: 'Email Notifications' },
                    { id: 'smsNotifications', label: 'SMS Notifications' },
                    { id: 'pushNotifications', label: 'Push Notifications' },
                    { id: 'pickupReminders', label: 'Pickup Reminders' },
                    { id: 'paymentAlerts', label: 'Payment Alerts' },
                    { id: 'driverUpdates', label: 'Driver Updates' },
                    { id: 'marketingEmails', label: 'Marketing Emails' },
                  ].map((item) => (
                    <label key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">{item.label}</span>
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-[#1976D2] rounded"
                        checked={notificationSettings[item.id as keyof typeof notificationSettings]}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          [item.id]: e.target.checked
                        })}
                      />
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Authentication Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Session Timeout (minutes)
                      </label>
                      <Input
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Max Login Attempts
                      </label>
                      <Input
                        value={securitySettings.maxLoginAttempts}
                        onChange={(e) => setSecuritySettings({...securitySettings, maxLoginAttempts: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password Min Length
                      </label>
                      <Input
                        value={securitySettings.passwordMinLength}
                        onChange={(e) => setSecuritySettings({...securitySettings, passwordMinLength: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Two-Factor Authentication</span>
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-[#1976D2] rounded"
                        checked={securitySettings.twoFactorAuth}
                        onChange={(e) => setSecuritySettings({...securitySettings, twoFactorAuth: e.target.checked})}
                      />
                    </label>
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Require Special Character</span>
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-[#1976D2] rounded"
                        checked={securitySettings.requireSpecialChar}
                        onChange={(e) => setSecuritySettings({...securitySettings, requireSpecialChar: e.target.checked})}
                      />
                    </label>
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Require Number</span>
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-[#1976D2] rounded"
                        checked={securitySettings.requireNumber}
                        onChange={(e) => setSecuritySettings({...securitySettings, requireNumber: e.target.checked})}
                      />
                    </label>
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">IP Whitelisting</span>
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-[#1976D2] rounded"
                        checked={securitySettings.ipWhitelisting}
                        onChange={(e) => setSecuritySettings({...securitySettings, ipWhitelisting: e.target.checked})}
                      />
                    </label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>API Keys</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Production API Key</p>
                        <p className="text-sm text-gray-500 font-mono">pk_live_••••••••••••••••</p>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Key className="w-4 h-4" />
                        Reveal
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Test API Key</p>
                        <p className="text-sm text-gray-500 font-mono">pk_test_••••••••••••••••</p>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Key className="w-4 h-4" />
                        Reveal
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        API Rate Limit (per minute)
                      </label>
                      <Input
                        value={systemSettings.apiRateLimit}
                        onChange={(e) => setSystemSettings({...systemSettings, apiRateLimit: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cache Timeout (seconds)
                      </label>
                      <Input
                        value={systemSettings.cacheTimeout}
                        onChange={(e) => setSystemSettings({...systemSettings, cacheTimeout: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Backup Frequency
                      </label>
                      <select 
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                        value={systemSettings.backupFrequency}
                        onChange={(e) => setSystemSettings({...systemSettings, backupFrequency: e.target.value})}
                      >
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Data Retention (days)
                      </label>
                      <Input
                        value={systemSettings.dataRetention}
                        onChange={(e) => setSystemSettings({...systemSettings, dataRetention: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Maintenance Mode</span>
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-[#1976D2] rounded"
                        checked={systemSettings.maintenanceMode}
                        onChange={(e) => setSystemSettings({...systemSettings, maintenanceMode: e.target.checked})}
                      />
                    </label>
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Debug Mode</span>
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-[#1976D2] rounded"
                        checked={systemSettings.debugMode}
                        onChange={(e) => setSystemSettings({...systemSettings, debugMode: e.target.checked})}
                      />
                    </label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="gap-2">
                      <RefreshCw className="w-4 h-4" />
                      Clear Cache
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Database className="w-4 h-4" />
                      Backup Now
                    </Button>
                    <Button variant="outline" className="gap-2 text-yellow-600">
                      <RefreshCw className="w-4 h-4" />
                      Restart Services
                    </Button>
                    <Button variant="outline" className="gap-2 text-red-600">
                      <Database className="w-4 h-4" />
                      Reset System
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}