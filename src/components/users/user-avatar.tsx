import { cn } from '@/libs/libs';
import React from 'react';

const UserAvatar = ({ src, label, className }: { src?: string; label: string; className?: string }) => {
  return <div className={cn('flex size-8 items-center justify-center rounded-full bg-gray-200 text-xs uppercase', className)}>{label}</div>;
};

export default UserAvatar;
