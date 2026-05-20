import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-dlz-primary text-white shadow-sm hover:opacity-90',
        ghost:
          'bg-transparent text-dlz-fg hover:bg-dlz-accent',
        outline:
          'border border-dlz-border bg-transparent text-dlz-fg hover:bg-dlz-accent',
        inverse:
          'bg-dlz-fg text-dlz-bg shadow-sm hover:opacity-90',
      },
      size: {
        default: 'h-10 px-4 py-2 text-sm rounded-md',
        xl:      'h-14 px-8 py-2 text-lg rounded-lg',
        sm:      'h-9 px-3 text-sm rounded-md',
        icon:    'h-9 w-9 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
