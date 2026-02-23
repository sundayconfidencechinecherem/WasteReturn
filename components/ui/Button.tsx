// components/ui/Button.tsx
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    fullWidth = false,
    children, 
    disabled,
    ...props 
  }, ref) => {
    const variants = {
      primary: 'bg-[#1976D2] text-white hover:bg-[#1565C0] focus:ring-2 focus:ring-[#1976D2] focus:ring-offset-2',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
      success: 'bg-[#2E7D32] text-white hover:bg-[#1B5E20] focus:ring-2 focus:ring-[#2E7D32] focus:ring-offset-2',
      danger: 'bg-[#D32F2F] text-white hover:bg-[#B71C1C] focus:ring-2 focus:ring-[#D32F2F] focus:ring-offset-2',
      warning: 'bg-[#FFC107] text-gray-900 hover:bg-[#FFB300] focus:ring-2 focus:ring-[#FFC107] focus:ring-offset-2',
      outline: 'border-2 border-[#1976D2] text-[#1976D2] hover:bg-[#1976D2] hover:text-white',
      ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full font-medium transition-colors',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { Button };