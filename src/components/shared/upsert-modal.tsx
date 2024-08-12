import React, { FC, ReactNode } from 'react';
import Modal from './modal';
import { cn } from '@/libs/libs';
import Button from './button';
import { IoMdClose } from 'react-icons/io';

interface UpsertModalProps {
  open: boolean;
  closeModal: () => void;
  title: string;
  children: ReactNode;
  className?: string;
  onCancel: () => void;
  onOk: () => void;
  cancelLabel?: string;
  okLabel?: string;
  okPending?: boolean;
  variant?: 'primary' | 'secondary';
}

const UpsertModal: FC<UpsertModalProps> = ({
  className,
  onCancel,
  onOk,
  cancelLabel,
  okLabel,
  okPending,
  children,
  title,
  closeModal,
  open,
  variant = 'primary',
}) => {
  return (
    <Modal open={open} closeModal={closeModal} contentClasses={cn('bg-white max-w-3xl shadow-lg rounded-lg flex flex-col', className)}>
      {variant === 'primary' && (
        <p className="w-full border-b border-b-gray-200 px-6 py-4 text-center text-sm font-bold text-[#334870]">{title}</p>
      )}
      {variant === 'secondary' && (
        <div className="sticky top-0 flex w-full items-center justify-between bg-white p-6">
          <div className="flex items-center gap-3">
            <IoMdClose className="size-sm cursor-pointer" onClick={closeModal} />
            <p className="font-bold text-[#261C15]">{title}</p>
          </div>
          <Button className="px-3.5 py-2 text-sm" onClick={onOk} loading={okPending}>
            {okLabel || 'დამატება'}
          </Button>
        </div>
      )}
      <div className={cn('w-full p-6', variant === 'secondary' && 'w-full rounded-b-lg bg-[#F4F5F9]')}>{children}</div>
      {variant === 'primary' && (
        <div className="flex w-full justify-end space-x-3 border-t border-t-gray-200 px-6 py-4">
          <Button onClick={onCancel} variant="text" className="font-semibold">
            {cancelLabel || 'გაუქმება'}
          </Button>
          <Button onClick={onOk} loading={okPending}>
            {okLabel || 'დამატება'}
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default UpsertModal;
