'use client';
import Button from '@/components/shared/button';
import Modal from '@/components/shared/modal';
import SuccessDialog from '@/components/shared/success-dialog';
import { cn } from '@/libs/libs';
import { updateUserAvatarAction } from '@/server-actions/users-actions';
import { useParams, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { FaCloudDownloadAlt } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const fileTypes = ['JPG', 'PNG', 'GIF'];

const UserAvatarUpload = ({ open, closeModal }: { open: boolean; closeModal: () => void }) => {
  const searchParams = useSearchParams();

  const [pending, setPending] = useState(false);
  const [file, setFile] = useState<null | File>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (file: File) => {
    setFile(file);
  };

  const handleUpload = async () => {
    const userId = searchParams.get('userProfile');
    if (!file || !userId) {
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    setPending(true);
    const { errorMessage } = await updateUserAvatarAction(formData, userId);
    if (!errorMessage) {
      closeModal();
      setShowSuccess(true);
    }
    setPending(false);
  };

  return (
    <>
      <SuccessDialog open={showSuccess} closeModal={() => setShowSuccess(false)} />

      <Modal open={open} closeModal={closeModal}>
        <div className="flex w-full max-w-lg flex-col items-center justify-center space-y-6 rounded-lg bg-white p-6 shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-lg bg-[#F5F8FF] text-[#2970FF]">
            <FaCloudDownloadAlt className="h-4 w-6" />
          </div>
          <div className="w-full">
            <p className="mb-3 text-center text-sm font-semibold">ატვირთვა</p>
            <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
            {file && (
              <div className="mt-2 flex items-center gap-4 rounded-lg bg-[#F5F8FF] px-4 py-2">
                <div className="w-fit rounded-lg border border-[#D1E0FF] p-2.5">{file?.name.split('.')[1]}</div>
                <p className="text-xs">{file?.name}</p>
                <IoClose className="ml-auto cursor-pointer" onClick={() => setFile(null)} />
              </div>
            )}
          </div>
          <div className="flex w-full justify-between">
            <Button variant="text" onClick={closeModal}>
              გაუქმება
            </Button>
            <Button className={cn(!file && 'opacity-40')} onClick={handleUpload} loading={pending}>
              შენახვა
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserAvatarUpload;
