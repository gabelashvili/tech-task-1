import { cn } from '@/libs/libs';
import { FC } from 'react';
import { IoInformationCircleOutline } from 'react-icons/io5';

interface AlertProps {
  text: string;
  color: 'default' | 'info' | 'error';
}

const Alert: FC<AlertProps> = ({ text, color }) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-lg p-2.5 text-sm',
        color === 'default' && 'bg-[#F1F1F1] text-gray-900',
        color === 'info' && 'bg-[#EEF4FF] text-[#0A3998]',
        color === 'error' && 'bg-[#F8F2F1] text-[#7A0000]',
      )}
    >
      <IoInformationCircleOutline className="size-4" />
      <p>{text}</p>
    </div>
  );
};

export default Alert;
