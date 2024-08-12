'use client';

import Button from './button';
import Modal from './modal';
import { FaCheckCircle } from 'react-icons/fa';

const SuccessDialog = ({ closeModal, open }: { open: boolean; closeModal: () => void }) => {
  return (
    <Modal open={open} closeModal={() => {}}>
      <div className="flex w-full max-w-3xl flex-col items-center justify-center rounded-lg bg-white text-[#027948] shadow-sm">
        <FaCheckCircle className="mt-12 size-[56px]" />
        <h1 className="mt-6 font-bold">ოპერაცია წარმატები განხორციელდა</h1>
        <Button className="mb-6 mt-16" onClick={closeModal}>
          დასრულება
        </Button>
      </div>
    </Modal>
  );
};

export default SuccessDialog;
