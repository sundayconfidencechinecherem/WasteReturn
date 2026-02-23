// app/user/dropoff/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  MapPin,
  Navigation,
  Clock,
  Phone,
  Calendar,
  ChevronRight,
  Star,
  Info,
  Filter,
  Search,
  Wifi,
  Battery,
  Award
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';

// Mock drop-off centers
const mockCenters = [
  {
    id: 'DC001',
    name: 'Lekki Phase 1 Recycling Hub',
    address: '12 Admiralty Way, Lekki Phase 1',
    distance: '1.2 km',
    hours: '8:00 AM - 8:00 PM',
    phone: '08031234567',
    rating: 4.8,
    acceptedWaste: ['Plastics', 'Glass', 'Paper', 'Electronics', 'Aluminum'],
    features: ['24/7 Kiosk', 'Instant Points', 'Free Parking'],
    queue: '5 mins',
    isOpen: true
  },
  {
    id: 'DC002',
    name: 'Ikoyi Waste Collection Center',
    address: '45 Bourdillon Road, Ikoyi',
    distance: '2.5 km',
    hours: '9:00 AM - 6:00 PM',
    phone: '08039876543',
    rating: 4.6,
    acceptedWaste: ['Plastics', 'Glass', 'Paper', 'Organic'],
    features: ['Drive-through', 'Weekend Hours'],
    queue: '15 mins',
    isOpen: true
  },
  {
    id: 'DC003',
    name: 'Victoria Island Recycling Point',
    address: '23 Ajose Adeogun Street, VI',
    distance: '3.8 km',
    hours: '7:00 AM - 7:00 PM',
    phone: '08055667788',
    rating: 4.9,
    acceptedWaste: ['All Types Accepted', 'Hazardous', 'E-Waste'],
    features: ['Special Handling', 'Certified Staff', 'Scale Available'],
    queue: '2 mins',
    isOpen: true
  },
  {
    id: 'DC004',
    name: 'Surulere Green Hub',
    address: '8 Bode Thomas Street, Surulere',
    distance: '5.1 km',
    hours: '10:00 AM - 6:00 PM',
    phone: '08099001122',
    rating: 4.5,
    acceptedWaste: ['Plastics', 'Paper', 'Glass'],
    features: ['Weekends Only', 'Small Scale'],
    queue: '20 mins',
    isOpen: false
  },
];

export default function UserDropoffPage() {
  const [search, setSearch] = useState('');
  const [selectedCenter, setSelectedCenter] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');

  const filteredCenters = mockCenters.filter(center => {
    if (filter === 'open' && !center.isOpen) return false;
    if (search && !center.name.toLowerCase().includes(search.toLowerCase()) && 
        !center.address.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

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
            <h1 className="text-xl font-semibold">Find Drop-off Centers</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select 
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Centers</option>
              <option value="open">Open Now</option>
            </select>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Map Preview */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Map view - {filteredCenters.length} centers near you</p>
                <p className="text-sm text-gray-400 mt-1">Google Maps integration</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Centers List */}
        <div className="space-y-4">
          {filteredCenters.map((center) => (
            <Card 
              key={center.id} 
              className={`hover:shadow-lg transition-shadow cursor-pointer ${
                selectedCenter === center.id ? 'ring-2 ring-[#1976D2]' : ''
              }`}
              onClick={() => setSelectedCenter(center.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{center.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{center.address}</span>
                    </div>
                  </div>
                  <Badge variant={center.isOpen ? 'success' : 'default'}>
                    {center.isOpen ? 'Open' : 'Closed'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">{center.distance}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{center.queue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">{center.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{center.phone}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Hours: <span className="font-normal text-gray-600">{center.hours}</span></p>
                  <div className="flex flex-wrap gap-2">
                    {center.acceptedWaste.map((waste, i) => (
                      <Badge key={i} variant="default" className="bg-gray-100">
                        {waste}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {center.features.map((feature, i) => (
                    <span key={i} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button variant="primary" size="sm" className="flex-1 gap-2">
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <Phone className="w-4 h-4" />
                    Call
                  </Button>
                </div>

                {center.isOpen && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-700">Self-service kiosk available - Instant points</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Card */}
        <Card className="mt-6 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800">Drop-off Tips</p>
                <ul className="text-sm text-blue-700 mt-2 space-y-1">
                  <li>• Bring your QR code for instant points</li>
                  <li>• Sort waste before arriving to save time</li>
                  <li>• 24/7 kiosks available at select locations</li>
                  <li>• Points credited immediately after verification</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}