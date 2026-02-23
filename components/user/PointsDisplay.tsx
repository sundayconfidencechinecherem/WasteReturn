// components/user/PointsDisplay.tsx
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatPoints, pointsToNaira } from '@/lib/utils';
import { ArrowRightIcon, WalletIcon } from 'lucide-react';
import Link from 'next/link';

interface PointsDisplayProps {
  points: number;
  showActions?: boolean;
}

export function PointsDisplay({ points, showActions = true }: PointsDisplayProps) {
  const nairaValue = pointsToNaira(points);

  return (
    <Card className="bg-linear-to-br from-[#1976D2] to-[#0D47A1] text-white">
      <CardContent className="p-6">
        <Link href="/user/wallet" className="block">
          <div className="flex items-start justify-between cursor-pointer hover:opacity-90 transition-opacity">
            <div>
              <p className="text-sm opacity-90 mb-1">Your Balance</p>
              <p className="text-4xl font-bold mb-1">{formatPoints(points)} pts</p>
              <p className="text-sm opacity-90">≈ ₦{nairaValue.toLocaleString()}</p>
            </div>
            <WalletIcon className="w-8 h-8 opacity-75" />
          </div>
        </Link>

        {showActions && (
          <div className="grid grid-cols-2 gap-3 mt-6">
            <Link href="/user/wallet/cash-out" className="w-full">
              <Button variant="secondary" size="sm" className="w-full bg-white/20 text-white hover:bg-white/30 border-0">
                Cash Out
              </Button>
            </Link>
            <Link href="/user/rewards" className="w-full">
              <Button variant="secondary" size="sm" className="w-full bg-white/20 text-white hover:bg-white/30 border-0">
                Rewards
              </Button>
            </Link>
          </div>
        )}

        {/* This is now a separate Link, not nested inside the parent Link */}
        <div className="mt-4 pt-4 border-t border-white/20">
          <Link 
            href="/user/wallet/transactions" 
            className="flex items-center justify-between text-sm opacity-90 hover:opacity-100 transition-opacity"
          >
            <span>View transactions</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}