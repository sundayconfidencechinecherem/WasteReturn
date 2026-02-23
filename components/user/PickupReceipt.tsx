'use client';

import { useRef } from 'react';
import { 
  Download, 
  Printer, 
  Share2,
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  Package,
  Award,
  User,
  Truck,
  Recycle,
  Leaf
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { PickupRequest, Driver } from '@/lib/types';
import { formatDate, formatPoints } from '@/lib/utils';

interface PickupReceiptProps {
  pickup: PickupRequest;
  driver?: Driver | null;
  onClose?: () => void;
}

export function PickupReceipt({ pickup, driver, onClose }: PickupReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null);

  const downloadReceipt = () => {
    if (!receiptRef.current) return;
    
    const receiptContent = receiptRef.current.outerHTML;
    const blob = new Blob([receiptContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${pickup.id}-${new Date().toISOString().split('T')[0]}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const printReceipt = () => {
    if (!receiptRef.current) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Pickup Receipt - ${pickup.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
            .receipt { border: 1px solid #ddd; padding: 20px; border-radius: 8px; }
            .header { text-align: center; margin-bottom: 20px; }
            .logo { font-size: 24px; font-weight: bold; color: #1976D2; }
            .details { margin: 20px 0; }
            .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
            .total { font-size: 18px; font-weight: bold; margin-top: 20px; }
            .footer { text-align: center; margin-top: 30px; color: #666; }
          </style>
        </head>
        <body>
          ${receiptRef.current.outerHTML}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
  };

  const shareReceipt = async () => {
    const receiptData = {
      title: `WasteReturn Receipt - ${pickup.id}`,
      text: `Pickup completed on ${formatDate(pickup.completionTime || pickup.scheduledDate)}. ${pickup.totalWeight}kg recycled. ${pickup.pointsEarned} points earned!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(receiptData);
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback
      navigator.clipboard.writeText(JSON.stringify(receiptData, null, 2));
      alert('Receipt details copied to clipboard!');
    }
  };

  return (
    <div className="space-y-4">
      {/* Receipt Preview */}
      <div ref={receiptRef} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1976D2] to-[#0D47A1] text-white p-6 text-center">
          <Recycle className="w-12 h-12 mx-auto mb-2" />
          <h2 className="text-2xl font-bold">WasteReturn</h2>
          <p className="text-sm opacity-90">Pickup Receipt</p>
        </div>

        {/* Receipt ID */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Receipt #</span>
            <span className="font-mono font-medium">{pickup.id}</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-sm text-gray-500">Date</span>
            <span className="font-medium">
              {formatDate(pickup.completionTime || pickup.scheduledDate)}
            </span>
          </div>
        </div>

        {/* Pickup Details */}
        <div className="p-4 space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Pickup Details
          </h3>
          
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Scheduled</p>
                <p className="text-xs text-gray-500">
                  {formatDate(pickup.scheduledDate)} • {pickup.timeWindow}
                </p>
              </div>
            </div>
            
            {pickup.completionTime && (
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Completed</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(pickup.completionTime)} at {new Date(pickup.completionTime).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-xs text-gray-500">{pickup.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Waste Items */}
        <div className="p-4 border-t border-gray-200">
          <h3 className="font-semibold flex items-center gap-2 mb-3">
            <Package className="w-4 h-4 text-[#1976D2]" />
            Waste Items
          </h3>
          
          <div className="space-y-2">
            {pickup.wasteTypes.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm capitalize">{item.wasteTypeId}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{item.actualWeight || item.estimatedWeight} kg</span>
                  <Badge variant="default" className="text-xs">
                    {item.actualWeight ? 'Actual' : 'Est.'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
            <span className="font-medium">Total Weight</span>
            <span className="font-bold text-lg">{pickup.totalWeight} kg</span>
          </div>
        </div>

        {/* Driver Info */}
        {driver && (
          <div className="p-4 border-t border-gray-200">
            <h3 className="font-semibold flex items-center gap-2 mb-3">
              <Truck className="w-4 h-4 text-[#1976D2]" />
              Driver
            </h3>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1976D2] rounded-full flex items-center justify-center text-white font-bold">
                {driver.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-medium">{driver.name}</p>
                <p className="text-xs text-gray-500">{driver.vehicleType} • {driver.licensePlate}</p>
              </div>
            </div>
          </div>
        )}

        {/* Points Earned */}
        <div className="p-4 border-t border-gray-200 bg-green-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-green-600" />
              <span className="font-semibold">Points Earned</span>
            </div>
            <span className="text-2xl font-bold text-green-600">+{pickup.pointsEarned}</span>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="p-4 border-t border-gray-200">
          <h3 className="font-semibold flex items-center gap-2 mb-3">
            <Leaf className="w-4 h-4 text-green-500" />
            Environmental Impact
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-500">CO₂ Prevented</p>
              <p className="font-bold text-blue-600">{(pickup.totalWeight! * 2.5).toFixed(1)} kg</p>
            </div>
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <p className="text-xs text-gray-500">Water Saved</p>
              <p className="font-bold text-green-600">{(pickup.totalWeight! * 50).toFixed(0)} L</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 text-center text-xs text-gray-400 border-t border-gray-200">
          <p>Thank you for recycling with WasteReturn!</p>
          <p className="mt-1">Every waste has value. Sort right, earn more.</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button onClick={downloadReceipt} variant="outline" className="flex-1 gap-2">
          <Download className="w-4 h-4" />
          Download
        </Button>
        <Button onClick={printReceipt} variant="outline" className="flex-1 gap-2">
          <Printer className="w-4 h-4" />
          Print
        </Button>
        <Button onClick={shareReceipt} variant="outline" className="flex-1 gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </div>

      {onClose && (
        <Button onClick={onClose} variant="primary" fullWidth>
          Close
        </Button>
      )}
    </div>
  );
}