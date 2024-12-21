import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-blue-100 text-blue-800 hover:bg-blue-200 focus:ring-blue-500',
        secondary:
          'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500',
        success:
          'bg-green-100 text-green-800 hover:bg-green-200 focus:ring-green-500',
        destructive:
          'bg-red-100 text-red-800 hover:bg-red-200 focus:ring-red-500',
        warning:
          'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 focus:ring-yellow-500',
        outline: 'text-gray-900 border border-gray-200 hover:bg-gray-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success' | 'destructive' | 'warning' | 'outline';
}

function Badge({ 
  className, 
  variant = 'default', 
  ...props 
}: BadgeProps) {
  return (
    <div 
      className={cn(badgeVariants({ variant }), className)} 
      {...props} 
    />
  );
}

Badge.displayName = 'Badge';

export { Badge };
