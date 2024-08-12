'use client';

import { FC, ReactNode } from 'react';
import Modal from './modal';
import { cn } from '@/libs/libs';
import { IoMdClose } from 'react-icons/io';
import Button from './button';

interface RemoveModalProps {
  open: boolean;
  closeModal: () => void;
  title: string;
  children: ReactNode;
  className?: string;
  onOk: () => void;
  okLabel: string;
  okPending?: boolean;
}

const RemoveModal: FC<RemoveModalProps> = ({ className, onOk, okLabel, okPending, children, title, closeModal, open }) => {
  return (
    <Modal open={open} closeModal={closeModal} contentClasses={cn('bg-white max-w-3xl shadow-lg rounded-lg flex flex-col', className)}>
      <div className="w-full">
        <div className="relative border-b border-b-gray-200 p-4">
          <p className="w-full text-center text-sm">{title}</p>
          <IoMdClose className="absolute right-4 top-4 size-4 cursor-pointer" onClick={closeModal} />
        </div>
        <div className="p-4">{children}</div>
        <div className="flex justify-end border-t border-t-gray-200 p-4">
          <Button variant="text" className="border border-gray-200 px-4 py-2.5 font-semibold" loading={okPending} onClick={onOk}>
            {okLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RemoveModal;
