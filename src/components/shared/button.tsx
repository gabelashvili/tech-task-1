'use client';

import { cn } from '@/libs/libs';
import { FC, ReactNode } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'text';
  type?: HTMLButtonElement['type'];
  disabled?: boolean;
  className?: string;
  loading?: boolean;
}
const Button: FC<ButtonProps> = ({ children, onClick, variant = 'primary', type = 'button', disabled, className, loading }) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={cn('relative rounded-lg px-5 py-3.5', variant === 'primary' && 'bg-[#1F5EDD] font-semibold text-white', className)}
    >
      {loading ? (
        <>
          <div className="opacity-0">{children}</div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <AiOutlineLoading3Quarters className="loading-icon" />
          </div>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
