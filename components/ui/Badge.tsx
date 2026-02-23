// components/ui/Badge.tsx
import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 
    | 'recyclable' 
    | 'organic' 
    | 'hazardous' 
    | 'electronic' 
    | 'residual'
    | 'gold' 
    | 'silver' 
    | 'bronze' 
    | 'mixed' 
    | 'contaminated'
    | 'success'
    | 'warning'
    | 'danger'
    | 'default';
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      // Waste category variants
      recyclable: 'bg-[#1976D2] text-white',
      organic: 'bg-[#2E7D32] text-white',
      hazardous: 'bg-[#C62828] text-white',
      electronic: 'bg-[#7B1FA2] text-white',
      residual: 'bg-[#757575] text-white',
      
      // Sorting quality variants
      gold: 'bg-[#FFD700] text-black',
      silver: 'bg-[#C0C0C0] text-black',
      bronze: 'bg-[#CD7F32] text-white',
      mixed: 'bg-[#9E9E9E] text-white',
      contaminated: 'bg-[#D32F2F] text-white',
      
      // Status variants
      success: 'bg-green-100 text-green-700',
      warning: 'bg-yellow-100 text-yellow-700',
      danger: 'bg-red-100 text-red-700',
      
      // Default
      default: 'bg-gray-100 text-gray-700',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';
export { Badge };