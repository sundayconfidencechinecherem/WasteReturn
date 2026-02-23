// app/user/profile/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Award,
  QrCode,
  Copy,
  Edit,
  Save,
  Bell,
  Shield,
  HelpCircle,
  FileText,
  LogOut,
  ChevronRight,
  Camera,
  Home,
  Users,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { toast } from 'react-hot-toast';
import { formatDate } from '@/lib/utils';

// Mock user data
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '08031234567',
  address: '12 Adebayo Street, Lekki Phase 1, Lagos',
  memberSince: '2026-01-15',
  householdId: 'H001',
  qrCode: 'WASTE-USER-12345-ABCDE',
  points: 3450,
  stats: {
    pickups: 24,
    weight: 245.5,
    trees: 12,
    co2: 65
  },
  family: [
    { name: 'Tunde Doe', relation: 'Son', age: 14, points: 450 },
    { name: 'Funke Doe', relation: 'Daughter', age: 10, points: 320 }
  ],
  preferences: {
    contactMethod: 'whatsapp',
    notifications: true,
    newsletter: false
  }
};

export default function UserProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(mockUser);
  const [activeTab, setActiveTab] = useState<'profile' | 'family' | 'preferences'>('profile');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    }, 1500);
  };

  const handleCopyQR = () => {
    navigator.clipboard.writeText(mockUser.qrCode);
    toast.success('QR Code copied to clipboard!');
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
            <Link href="/user/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">My Profile</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-[#1976D2] rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full border border-gray-200 flex items-center justify-center">
                      <Camera className="w-3 h-3 text-gray-600" />
                    </button>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{profile.name}</h2>
                  <p className="text-sm text-gray-500">Member since {formatDate(profile.memberSince)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="success">Active</Badge>
                    <Badge variant="gold">{profile.points} pts</Badge>
                  </div>
                </div>
              </div>
              <Button 
                variant={isEditing ? 'primary' : 'outline'} 
                size="sm"
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                isLoading={isLoading}
              >
                {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                {isEditing ? 'Save' : 'Edit'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['profile', 'family', 'preferences'] as const).map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'bg-[#1976D2] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'profile' && (
          <>
            {/* Contact Information */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
              </CardContent>
            </Card>

            {/* QR Code */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Household QR Code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    <QrCode className="w-20 h-20 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-2">ID: {profile.householdId}</p>
                    <p className="text-xs font-mono bg-gray-50 p-2 rounded mb-3">{profile.qrCode}</p>
                    <Button variant="outline" size="sm" onClick={handleCopyQR} className="gap-2">
                      <Copy className="w-4 h-4" />
                      Copy QR Code
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Print this QR code and display it on your waste bin for easy scanning
                </p>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Recycling Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <Home className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <p className="text-xl font-bold">{profile.stats.pickups}</p>
                    <p className="text-xs text-gray-500">Pickups</p>
                  </div>
                  <div className="text-center">
                    <Award className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <p className="text-xl font-bold">{profile.stats.weight}kg</p>
                    <p className="text-xs text-gray-500">Recycled</p>
                  </div>
                  <div className="text-center">
                    <Users className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                    <p className="text-xl font-bold">{profile.stats.trees}</p>
                    <p className="text-xs text-gray-500">Trees Saved</p>
                  </div>
                  <div className="text-center">
                    <Clock className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                    <p className="text-xl font-bold">{profile.stats.co2}kg</p>
                    <p className="text-xs text-gray-500">CO₂ Prevented</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'family' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Family Members</CardTitle>
                <Button variant="primary" size="sm">Add Member</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.family.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1976D2]/10 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-[#1976D2]" />
                    </div>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.relation}, {member.age} years</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{member.points} pts</p>
                    <p className="text-xs text-gray-500">own points</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {activeTab === 'preferences' && (
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Contact Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['sms', 'whatsapp', 'both'] as const).map((method) => (
                    <button
                      key={method}
                      className={`p-3 rounded-lg border text-sm capitalize ${
                        profile.preferences.contactMethod === method
                          ? 'border-[#1976D2] bg-[#1976D2]/10 text-[#1976D2]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setProfile({
                        ...profile,
                        preferences: { ...profile.preferences, contactMethod: method }
                      })}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-500">Receive pickup reminders and updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={profile.preferences.notifications}
                      onChange={() => setProfile({
                        ...profile,
                        preferences: { 
                          ...profile.preferences, 
                          notifications: !profile.preferences.notifications 
                        }
                      })}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1976D2]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Newsletter</p>
                    <p className="text-sm text-gray-500">Receive tips and updates about recycling</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={profile.preferences.newsletter}
                      onChange={() => setProfile({
                        ...profile,
                        preferences: { 
                          ...profile.preferences, 
                          newsletter: !profile.preferences.newsletter 
                        }
                      })}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1976D2]"></div>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Links */}
        <Card className="mt-6">
          <CardContent className="p-0">
            <Link href="/user/notifications">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-b">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <span>Notifications</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </Link>
            <Link href="/user/education">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-b">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-gray-400" />
                  <span>Help & Education</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </Link>
            <Link href="/terms">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-b">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <span>Terms & Privacy</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </Link>
            <button 
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 text-red-600"
              onClick={handleLogout}
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </div>
            </button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}