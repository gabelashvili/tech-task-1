/* eslint-disable react/display-name */
'use client';

import { cn } from '@/libs/libs';
import { ChangeEvent, HTMLInputTypeAttribute, ReactNode, forwardRef } from 'react';
import { IoMdWarning } from 'react-icons/io';

interface TextFieldProps {
  placeholder?: string;
  label?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
  disabled?: boolean;
  error?: boolean;
  errorText?: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  className?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ onChange, value, label, placeholder, name, disabled, error, errorText, type = 'text', required, className }, ref) => {
    return (
      <div className={cn('w-full space-y-1.5', className)}>
        <p className="text-sm">
          {label}
          {required && <span className="ml-1 text-red-700">*</span>}
        </p>
        <input
          type={type}
          ref={ref}
          name={name}
          onChange={onChange}
          value={value}
          disabled={disabled}
          className={cn(
            'w-full rounded-lg border border-[#C9D0E1] px-3.5 py-3.5 placeholder:text-gray-500 focus:shadow-[0px_0px_0px_3px_#84DAFF] focus:outline-[#2970FF]',
            disabled && 'cursor-not-allowed opacity-85',
            error && 'border-red-600 focus:!shadow-none focus:outline-red-600',
          )}
          placeholder={placeholder}
        />
        {errorText && (
          <p className="flex items-center gap-3 text-sm text-red-700">
            <IoMdWarning className="size-4" />
            {errorText}
          </p>
        )}
      </div>
    );
  },
);

export default TextField;
