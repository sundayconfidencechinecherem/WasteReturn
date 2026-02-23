// components/user/PickupCard.tsx
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PickupRequest } from '@/lib/types';
import { formatDate, formatTime } from '@/lib/utils';
import { 
  CalendarIcon, 
  ClockIcon, 
  MapPinIcon, 
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon
} from 'lucide-react';

interface PickupCardProps {
  pickup: PickupRequest;
  onReschedule?: () => void;
  onCancel?: () => void;
  onTrack?: () => void;
}

export function PickupCard({ pickup, onReschedule, onCancel, onTrack }: PickupCardProps) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    assigned: 'bg-blue-100 text-blue-800',
    en_route: 'bg-purple-100 text-purple-800',
    arrived: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800',
    rescheduled: 'bg-orange-100 text-orange-800',
  };

  const statusLabels = {
    pending: 'Pending',
    assigned: 'Driver Assigned',
    en_route: 'En Route',
    arrived: 'Arrived',
    completed: 'Completed',
    cancelled: 'Cancelled',
    rescheduled: 'Rescheduled',
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TruckIcon className="w-5 h-5 text-gray-400" />
              <span className="font-semibold">Pickup #{pickup.id.slice(-6)}</span>
            </div>
            <Badge variant="default" className={statusColors[pickup.status]}>
              {statusLabels[pickup.status]}
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">{formatDate(pickup.scheduledDate)}</div>
            <div className="text-xs text-gray-500 capitalize">{pickup.timeWindow}</div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <CalendarIcon className="w-4 h-4 text-gray-400" />
            <span>Scheduled for {formatDate(pickup.scheduledDate)}</span>
          </div>
          
          {pickup.estimatedArrival && (
            <div className="flex items-center gap-2 text-sm">
              <ClockIcon className="w-4 h-4 text-gray-400" />
              <span>Estimated arrival: {formatTime(pickup.estimatedArrival)}</span>
            </div>
          )}

          <div className="flex items-start gap-2 text-sm">
            <MapPinIcon className="w-4 h-4 text-gray-400 mt-0.5" />
            <span className="text-gray-600">Your location</span>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <p className="text-sm font-medium mb-2">Waste types:</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {pickup.wasteTypes.map((waste, i) => (
              <Badge key={i} variant="default" className="bg-gray-100">
                {waste.estimatedWeight}kg
              </Badge>
            ))}
          </div>

          <div className="flex gap-2">
            {pickup.status === 'pending' && (
              <>
                <Button variant="outline" size="sm" onClick={onReschedule}>
                  Reschedule
                </Button>
                <Button variant="danger" size="sm" onClick={onCancel}>
                  Cancel
                </Button>
              </>
            )}
            {(pickup.status === 'assigned' || pickup.status === 'en_route') && (
              <Button variant="primary" size="sm" onClick={onTrack} className="flex-1">
                Track Driver
              </Button>
            )}
            {pickup.status === 'completed' && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircleIcon className="w-5 h-5" />
                <span>Completed successfully</span>
              </div>
            )}
            {pickup.status === 'cancelled' && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <XCircleIcon className="w-5 h-5" />
                <span>Cancelled</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}