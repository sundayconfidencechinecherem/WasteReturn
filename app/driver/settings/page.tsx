// app/driver/settings/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Truck,
  Bell,
  Shield,
  Clock,
  DollarSign,
  Camera,
  Save,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'react-hot-toast';

// Mock driver data
const mockDriver = {
  name: 'Segun Adeleke',
  email: 'segun.a@wastereturn.com',
  phone: '08031234567',
  address: '23 Ikeja, Lagos',
  vehicle: 'Tricycle - ABC123XY',
  zone: 'Lekki Phase 1',
  emergencyContact: 'Blessing Adeleke - 08039876543',
  bankDetails: {
    bank: 'GTBank',
    accountName: 'Segun Adeleke',
    accountNumber: '0123456789'
  }
};

export default function DriverSettingsPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(mockDriver);
  const [notifications, setNotifications] = useState({
    newPickups: true,
    routeUpdates: true,
    earnings: true,
    systemAlerts: true,
    smsAlerts: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
      toast.success('Settings saved successfully!');
    }, 1500);
  };

  const handleLogout = () => {
    toast.success('Logged out successfully');
    // Redirect to login
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/driver/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Settings</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Profile Section */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Profile Information</CardTitle>
              <Button 
                variant={isEditing ? 'primary' : 'outline'} 
                size="sm"
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                isLoading={isLoading}
              >
                {isEditing ? <Save className="w-4 h-4 mr-2" /> : null}
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <div className="w-20 h-20 bg-[#1976D2] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  SA
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full border border-gray-200 flex items-center justify-center">
                    <Camera className="w-3 h-3 text-gray-600" />
                  </button>
                )}
              </div>
              <div>
                <p className="text-lg font-semibold">{profile.name}</p>
                <p className="text-sm text-gray-500">Driver ID: D001</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                {isEditing ? (
                  <Input 
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                ) : (
                  <span>{profile.name}</span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                {isEditing ? (
                  <Input 
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                ) : (
                  <span>{profile.email}</span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                {isEditing ? (
                  <Input 
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                ) : (
                  <span>{profile.phone}</span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                {isEditing ? (
                  <Input 
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  />
                ) : (
                  <span>{profile.address}</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Vehicle Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-gray-400" />
              <span>{profile.vehicle}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span>Service Zone: {profile.zone}</span>
            </div>
          </CardContent>
        </Card>

        {/* Bank Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Bank Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Bank:</span>
              <span className="font-medium">{profile.bankDetails.bank}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Account Name:</span>
              <span className="font-medium">{profile.bankDetails.accountName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Account Number:</span>
              <span className="font-medium">{profile.bankDetails.accountNumber}</span>
            </div>
            <Button variant="outline" size="sm" className="mt-2 w-full">
              Update Bank Details
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={value}
                    onChange={() => setNotifications({ ...notifications, [key]: !value })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1976D2]"></div>
                </label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-400" />
                <span>Privacy Policy</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <span>Work Schedule</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <span>Payout Settings</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button 
          variant="danger" 
          size="lg" 
          fullWidth 
          className="gap-2"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </main>
    </div>
  );
}