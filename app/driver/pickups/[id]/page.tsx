// app/driver/pickups/[id]/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft,
  User,
  MapPin,
  Clock,
  Calendar,
  Phone,
  Mail,
  Navigation,
  Camera,
  Weight,
  Award,
  CheckCircle,
  AlertCircle,
  Info,
  Scan,
  Wifi,
  WifiOff
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { toast } from 'react-hot-toast';

// Mock pickup data
const mockPickup = {
  id: 'PK003',
  user: {
    name: 'Peter Okafor',
    phone: '08055667788',
    email: 'peter@example.com',
    address: '8 Bourdillon Rd, Ikoyi',
    qrCode: 'PK003-USER-12345',
    notes: 'Gate code is 1234. Please call on arrival.'
  },
  scheduledTime: '2026-02-21T14:30:00',
  timeWindow: 'afternoon',
  wasteTypes: [
    { id: 'pet', name: 'PET Plastics', icon: '🧴', estimatedWeight: 8, basePoints: 40 },
    { id: 'glass', name: 'Glass', icon: '🥤', estimatedWeight: 5, basePoints: 10 },
    { id: 'aluminum', name: 'Aluminum', icon: '🥫', estimatedWeight: 2, basePoints: 100 },
  ],
  status: 'assigned',
  distance: '1.2 km',
  estimatedArrival: '2:30 PM'
};

export default function DriverPickupDetailPage() {
  const router = useRouter();
  const [step, setStep] = useState<'details' | 'weighing' | 'quality' | 'complete'>('details');
  const [isScaleConnected, setIsScaleConnected] = useState(false);
  const [weight, setWeight] = useState<Record<string, number>>({});
  const [photos, setPhotos] = useState<string[]>([]);
  const [quality, setQuality] = useState<'gold' | 'silver' | 'bronze' | 'mixed' | 'contaminated'>('mixed');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const calculatePoints = () => {
    let total = 0;
    mockPickup.wasteTypes.forEach(waste => {
      const wasteWeight = weight[waste.id] || waste.estimatedWeight;
      const multiplier = 
        quality === 'gold' ? 1.5 :
        quality === 'silver' ? 1.3 :
        quality === 'bronze' ? 1.1 :
        quality === 'mixed' ? 1.0 : 0.5;
      total += waste.basePoints * wasteWeight * multiplier;
    });
    return Math.round(total);
  };

  const handleScanQR = () => {
    toast.success('QR Code scanned successfully!');
    setStep('weighing');
  };

  const handleConnectScale = () => {
    setIsScaleConnected(true);
    toast.success('Scale connected');
    // Simulate weight reading
    const newWeight: Record<string, number> = {};
    mockPickup.wasteTypes.forEach(waste => {
      newWeight[waste.id] = waste.estimatedWeight;
    });
    setWeight(newWeight);
  };

  const handleTakePhoto = () => {
    // Simulate taking photo
    setPhotos([...photos, 'photo-' + Date.now()]);
    toast.success('Photo added');
  };

  const handleComplete = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Pickup completed successfully!');
      router.push('/driver/dashboard');
    }, 2000);
  };

  const getQualityMultiplier = () => {
    switch(quality) {
      case 'gold': return 1.5;
      case 'silver': return 1.3;
      case 'bronze': return 1.1;
      case 'mixed': return 1.0;
      case 'contaminated': return 0.5;
    }
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
            <div>
              <h1 className="text-xl font-semibold">Pickup #{mockPickup.id}</h1>
              <p className="text-sm text-gray-500">{mockPickup.distance} away • Est. {mockPickup.estimatedArrival}</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mt-4 max-w-2xl mx-auto">
            {[
              { id: 'details', label: 'Details', icon: Info },
              { id: 'weighing', label: 'Weighing', icon: Weight },
              { id: 'quality', label: 'Quality', icon: Award },
              { id: 'complete', label: 'Complete', icon: CheckCircle },
            ].map((s, index) => {
              const Icon = s.icon;
              const isActive = step === s.id;
              const isPast = ['details', 'weighing', 'quality', 'complete'].indexOf(step) > index;
              
              return (
                <div key={s.id} className="flex items-center flex-1">
                  <div className={`flex flex-col items-center`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isActive ? 'bg-[#1976D2] text-white' :
                      isPast ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-xs mt-1 ${isActive ? 'text-[#1976D2] font-medium' : 'text-gray-500'}`}>
                      {s.label}
                    </span>
                  </div>
                  {index < 3 && (
                    <div className={`flex-1 h-0.5 mx-2 ${
                      isPast ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 pb-24">
        {step === 'details' && (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Navigation Card */}
            <Card className="bg-blue-50 border-2 border-[#1976D2]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-5 h-5 text-[#1976D2]" />
                    <h2 className="font-semibold">Navigate to Pickup</h2>
                  </div>
                  <Badge variant="gold">{mockPickup.distance}</Badge>
                </div>
                <p className="text-sm mb-4">{mockPickup.user.address}</p>
                <Button variant="primary" size="lg" fullWidth className="gap-2">
                  <Navigation className="w-5 h-5" />
                  Start Navigation
                </Button>
              </CardContent>
            </Card>

            {/* Customer Details */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#1976D2]/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-[#1976D2]" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{mockPickup.user.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{mockPickup.user.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{mockPickup.user.email}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Special Instructions</p>
                      <p className="text-sm text-gray-600">{mockPickup.user.notes}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Waste Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Waste to Collect</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockPickup.wasteTypes.map((waste) => (
                    <div key={waste.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{waste.icon}</span>
                        <div>
                          <p className="font-medium">{waste.name}</p>
                          <p className="text-xs text-gray-500">{waste.basePoints} pts/kg</p>
                        </div>
                      </div>
                      <div>
                        <span className="font-bold">{waste.estimatedWeight} kg</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* QR Scan */}
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-32 h-32 bg-gray-100 mx-auto mb-4 rounded-lg flex items-center justify-center">
                  <Scan className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 mb-4">Scan customer's QR code to start pickup</p>
                <Button variant="primary" size="lg" fullWidth onClick={handleScanQR}>
                  Scan QR Code
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'weighing' && (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Scale Connection */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {isScaleConnected ? (
                      <Wifi className="w-5 h-5 text-green-500" />
                    ) : (
                      <WifiOff className="w-5 h-5 text-gray-400" />
                    )}
                    <h2 className="font-semibold">Bluetooth Scale</h2>
                  </div>
                  {!isScaleConnected && (
                    <Button variant="outline" size="sm" onClick={handleConnectScale}>
                      Connect
                    </Button>
                  )}
                </div>
                {isScaleConnected && (
                  <div className="bg-green-50 p-3 rounded-lg text-sm text-green-700">
                    ✓ Scale connected - ready to weigh
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Weighing */}
            <Card>
              <CardHeader>
                <CardTitle>Weigh Waste</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {mockPickup.wasteTypes.map((waste) => (
                  <div key={waste.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{waste.icon}</span>
                        <span className="font-medium">{waste.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">Est: {waste.estimatedWeight} kg</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Input
                        type="number"
                        step="0.1"
                        min="0"
                        value={weight[waste.id] || ''}
                        onChange={(e) => setWeight({ ...weight, [waste.id]: parseFloat(e.target.value) })}
                        placeholder="Enter weight"
                        className="flex-1"
                      />
                      <span className="text-sm font-medium">kg</span>
                    </div>
                  </div>
                ))}

                <Button 
                  variant="primary" 
                  size="lg" 
                  fullWidth 
                  onClick={() => setStep('quality')}
                  disabled={Object.keys(weight).length === 0}
                >
                  Continue to Quality Check
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'quality' && (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Quality Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Sorting Quality</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { id: 'gold', label: 'Gold - Perfectly sorted, clean', multiplier: 1.5, color: 'bg-[#FFD700]' },
                  { id: 'silver', label: 'Silver - Well sorted, mostly clean', multiplier: 1.3, color: 'bg-[#C0C0C0]' },
                  { id: 'bronze', label: 'Bronze - Sorted but needs work', multiplier: 1.1, color: 'bg-[#CD7F32]' },
                  { id: 'mixed', label: 'Mixed - Combined recyclables', multiplier: 1.0, color: 'bg-[#9E9E9E]' },
                  { id: 'contaminated', label: 'Contaminated - Wrong items', multiplier: 0.5, color: 'bg-[#D32F2F]' },
                ].map((q) => (
                  <button
                    key={q.id}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      quality === q.id 
                        ? 'border-[#1976D2] bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setQuality(q.id as typeof quality)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full ${q.color}`} />
                        <span className="font-medium">{q.label}</span>
                      </div>
                      <Badge variant="gold">{q.multiplier}x</Badge>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Photos */}
            <Card>
              <CardHeader>
                <CardTitle>Evidence Photos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {photos.map((photo, i) => (
                    <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      <Camera className="w-6 h-6 text-gray-400" />
                    </div>
                  ))}
                  <button 
                    className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-[#1976D2] transition-colors"
                    onClick={handleTakePhoto}
                  >
                    <Camera className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Add Photo</span>
                  </button>
                </div>
                <p className="text-xs text-gray-500">Take photos of the waste as evidence</p>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any observations or issues..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1976D2]"
                />
              </CardContent>
            </Card>

            {/* Points Preview */}
            <Card className="bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Estimated Points:</span>
                  <span className="text-2xl font-bold text-green-600">{calculatePoints()} pts</span>
                </div>
                <p className="text-xs text-gray-600">
                  Based on {quality} quality ({getQualityMultiplier()}x multiplier)
                </p>
                <Button 
                  variant="primary" 
                  size="lg" 
                  fullWidth 
                  className="mt-4"
                  onClick={() => setStep('complete')}
                >
                  Continue to Complete
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'complete' && (
          <div className="max-w-md mx-auto text-center space-y-6">
            <Card>
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Pickup Complete!</h2>
                <p className="text-gray-600 mb-6">
                  You've successfully completed this pickup
                </p>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex justify-between mb-2">
                    <span>Total Weight:</span>
                    <span className="font-bold">
                      {Object.values(weight).reduce((a, b) => a + b, 0).toFixed(1)} kg
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Quality:</span>
                    <span className="font-bold capitalize">{quality}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Points Earned:</span>
                    <span className="font-bold text-green-600 text-xl">{calculatePoints()} pts</span>
                  </div>
                </div>

                <Button 
                  variant="primary" 
                  size="lg" 
                  fullWidth
                  onClick={handleComplete}
                  isLoading={isLoading}
                >
                  Confirm & Complete
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}