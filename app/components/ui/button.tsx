// app/components/ui/button.tsx

import { cn } from '@/lib/utils'; // utility for conditional class names, adjust based on your project
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const buttonVariants = (variant: 'primary' | 'secondary' = 'primary') => {
  return variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white';
};

const Button: React.FC<ButtonProps> = ({ variant = 'primary', className, ...props }) => {
  return (
    <button
      className={cn(buttonVariants(variant), className)}
      {...props}
    />
  );
};

export default Button;
