// app/user/schedule/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { WasteCategoryCard } from '@/components/user/WasteCategoryCard';
import { WASTE_TYPES, PICKUP_TIME_WINDOWS } from '@/lib/constants';
import { WasteType } from '@/lib/types';
import { ArrowLeftIcon, ClockIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';

type TimeWindow = 'morning' | 'afternoon' | 'evening';

export default function SchedulePickupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWaste, setSelectedWaste] = useState<Record<string, number>>({});
  const [pickupDate, setPickupDate] = useState('');
  const [timeWindow, setTimeWindow] = useState<TimeWindow>('morning');
  const [notes, setNotes] = useState('');

  const handleWasteSelect = (wasteId: string) => {
    setSelectedWaste(prev => {
      const newState = { ...prev };
      if (newState[wasteId]) {
        delete newState[wasteId];
      } else {
        newState[wasteId] = 1;
      }
      return newState;
    });
  };

  const handleWeightChange = (wasteId: string, weight: number) => {
    setSelectedWaste(prev => ({
      ...prev,
      [wasteId]: Math.max(0.5, weight)
    }));
  };

  const calculateTotalWeight = () => {
    return Object.values(selectedWaste).reduce((sum, weight) => sum + weight, 0);
  };

  const calculateEstimatedPoints = () => {
    let total = 0;
    Object.entries(selectedWaste).forEach(([wasteId, weight]) => {
      const waste = WASTE_TYPES.find(w => w.id === wasteId);
      if (waste) {
        total += (waste.basePointsPerKg) * weight;
      }
    });
    return total;
  };

  const handleSubmit = async () => {
    if (step === 1) {
      if (Object.keys(selectedWaste).length === 0) {
        toast.error('Please select at least one waste type');
        return;
      }
      setStep(2);
      return;
    }

    if (!pickupDate) {
      toast.error('Please select a pickup date');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Pickup scheduled successfully!');
      router.push('/user/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/user/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeftIcon className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Schedule Pickup</h1>
          </div>
          <div className="flex items-center justify-between mt-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  i <= step ? 'bg-[#1976D2] text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {i}
                </div>
                {i < 2 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    i < step ? 'bg-[#1976D2]' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 pb-24">
        {step === 1 ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Waste Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {WASTE_TYPES.map((waste) => (
                    <WasteCategoryCard
                      key={waste.id}
                      wasteType={waste as WasteType}
                      selected={!!selectedWaste[waste.id]}
                      onSelect={() => handleWasteSelect(waste.id)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {Object.keys(selectedWaste).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Estimated Weights (kg)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(selectedWaste).map(([wasteId, weight]) => {
                      const waste = WASTE_TYPES.find(w => w.id === wasteId);
                      if (!waste) return null;
                      return (
                        <div key={wasteId} className="flex items-center gap-4">
                          <div className="w-32">
                            <p className="font-medium">{waste.name}</p>
                          </div>
                          <input
                            type="range"
                            min="0.5"
                            max="20"
                            step="0.5"
                            value={weight}
                            onChange={(e) => handleWeightChange(wasteId, parseFloat(e.target.value))}
                            className="flex-1"
                          />
                          <input
                            type="number"
                            min="0.5"
                            max="20"
                            step="0.5"
                            value={weight}
                            onChange={(e) => handleWeightChange(wasteId, parseFloat(e.target.value))}
                            className="w-20 px-2 py-1 border rounded-lg text-center"
                          />
                          <span className="text-sm text-gray-500">kg</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total Weight:</span>
                      <span className="text-lg font-bold">{calculateTotalWeight().toFixed(1)} kg</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-medium">Estimated Points:</span>
                      <span className="text-lg font-bold text-green-600">
                        ≈ {calculateEstimatedPoints()} pts
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="max-w-md mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pickup Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1976D2]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Time
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {PICKUP_TIME_WINDOWS.map((window) => (
                      <button
                        key={window.id}
                        type="button"
                        className={`p-3 rounded-lg border text-sm ${
                          timeWindow === window.id
                            ? 'border-[#1976D2] bg-[#1976D2]/10 text-[#1976D2]'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setTimeWindow(window.id as TimeWindow)}
                      >
                        {window.label.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Gate code, special instructions, etc."
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1976D2]"
                  />
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800 flex items-center gap-2">
                    <ClockIcon className="w-4 h-4" />
                    Please have your waste ready 15 minutes before the scheduled time.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Waste Types:</span>
                    <span className="font-medium">{Object.keys(selectedWaste).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Weight:</span>
                    <span className="font-medium">{calculateTotalWeight().toFixed(1)} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Points:</span>
                    <span className="font-medium text-green-600">{calculateEstimatedPoints()} pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{pickupDate || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium capitalize">{timeWindow}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="container mx-auto max-w-2xl">
            <Button 
              variant="primary" 
              size="lg" 
              fullWidth
              onClick={handleSubmit}
              isLoading={isLoading}
            >
              {step === 1 ? 'Continue' : 'Schedule Pickup'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}