// app/driver/route/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Navigation,
  MapPin,
  Clock,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Truck,
  Phone,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

// Mock route data
const mockRoute = {
  totalDistance: '8.5 km',
  estimatedDuration: '2.5 hours',
  pickups: [
    {
      id: 'PK003',
      sequence: 1,
      user: 'Peter Okafor',
      address: '8 Bourdillon Rd, Ikoyi',
      time: '2:30 PM',
      distance: '1.2 km',
      status: 'current',
      wasteTypes: ['Plastics', 'Glass'],
      phone: '08055667788'
    },
    {
      id: 'PK004',
      sequence: 2,
      user: 'Adaobi Nwosu',
      address: '23 Ajose Adeogun, VI',
      time: '4:00 PM',
      distance: '2.8 km',
      status: 'upcoming',
      wasteTypes: ['Cardboard', 'Paper'],
      phone: '08099001122'
    },
    {
      id: 'PK005',
      sequence: 3,
      user: 'Chidi Eze',
      address: '7 Milverton Rd, Ikoyi',
      time: '5:30 PM',
      distance: '1.5 km',
      status: 'upcoming',
      wasteTypes: ['Aluminum', 'Electronics'],
      phone: '08022334455'
    },
    {
      id: 'PK006',
      sequence: 4,
      user: 'Funke Adebayo',
      address: '15 Norman Williams, Ikoyi',
      time: '6:45 PM',
      distance: '1.8 km',
      status: 'upcoming',
      wasteTypes: ['Glass', 'Plastics'],
      phone: '08011223344'
    },
  ]
};

export default function DriverRoutePage() {
  const [selectedPickup, setSelectedPickup] = useState(mockRoute.pickups[0]);

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
            <div>
              <h1 className="text-xl font-semibold">Today's Route</h1>
              <p className="text-sm text-gray-500">
                {mockRoute.totalDistance} • {mockRoute.estimatedDuration}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map Placeholder */}
          <Card className="lg:col-span-1">
            <CardContent className="p-0 h-[500px] bg-gray-100 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <Navigation className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">Map view loading...</p>
                <p className="text-sm text-gray-400 mt-2">Google Maps integration</p>
              </div>
            </CardContent>
          </Card>

          {/* Route List */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Route Overview</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
                  
                  {mockRoute.pickups.map((pickup, index) => (
                    <div 
                      key={pickup.id}
                      className={`relative flex items-start gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedPickup.id === pickup.id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedPickup(pickup)}
                    >
                      {/* Sequence number */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-10 ${
                        pickup.status === 'completed' ? 'bg-green-500 text-white' :
                        pickup.status === 'current' ? 'bg-[#1976D2] text-white' :
                        'bg-gray-200 text-gray-600'
                      }`}>
                        {pickup.sequence}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold">{pickup.user}</h3>
                          {pickup.status === 'current' && (
                            <Badge variant="warning">Current</Badge>
                          )}
                        </div>
                        
                        <div className="flex items-start gap-2 text-sm text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <span>{pickup.address}</span>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{pickup.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Navigation className="w-4 h-4 text-gray-400" />
                            <span>{pickup.distance}</span>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-2">
                          {pickup.wasteTypes.map((type, i) => (
                            <Badge key={i} variant="default" className="bg-gray-100">
                              {type}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-2 mt-3">
                          <Button variant="outline" size="sm" className="gap-1">
                            <Phone className="w-3 h-3" />
                            Call
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1">
                            <MessageSquare className="w-3 h-3" />
                            SMS
                          </Button>
                          {pickup.status !== 'completed' && (
                            <Link href={`/driver/pickups/${pickup.id}`} className="ml-auto">
                              <Button variant="primary" size="sm" className="gap-1">
                                Start
                                <ChevronRight className="w-4 h-4" />
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Route Summary */}
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-gray-500">Total Pickups</p>
                    <p className="text-xl font-bold">{mockRoute.pickups.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Completed</p>
                    <p className="text-xl font-bold text-green-600">
                      {mockRoute.pickups.filter(p => p.status === 'completed').length}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Remaining</p>
                    <p className="text-xl font-bold text-blue-600">
                      {mockRoute.pickups.filter(p => p.status !== 'completed').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Button */}
            {selectedPickup && (
              <Button variant="primary" size="lg" fullWidth className="gap-2">
                <Navigation className="w-5 h-5" />
                Navigate to {selectedPickup.user}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}