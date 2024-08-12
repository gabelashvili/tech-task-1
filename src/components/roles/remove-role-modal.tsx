'use client';

import { IRole } from '@/types/role';
import Alert from '../shared/alert';
import RemoveModal from '../shared/remove-modal';
import { HiOutlineUsers } from 'react-icons/hi2';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { removeRoleAction } from '@/server-actions/roles-actions';
import { toast } from 'react-toastify';
import SuccessDialog from '../shared/success-dialog';

const RemoveRoleModal = ({ data }: { data: IRole }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [pending, setPending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const closeModal = () => {
    params.delete('remove');
    params.delete('itemId');
    router.replace(`${pathname}?${params.toString()}`);
  };

  const removeRole = async () => {
    setPending(true);
    const { errorMessage } = await removeRoleAction(data.id.toString());
    if (errorMessage) {
      toast.error(errorMessage);
      setPending(false);
    } else {
      closeModal();
      setShowSuccess(true);
    }
  };

  return (
    <>
      <SuccessDialog open={showSuccess} closeModal={() => setShowSuccess(false)} />
      <RemoveModal
        open={!!params.get('remove') && !!params.get('itemId')}
        closeModal={closeModal}
        okPending={pending}
        onOk={() => {
          if (data.totalUsers > 0) {
            closeModal();
          } else {
            removeRole();
          }
        }}
        title="როლის წაშლა"
        okLabel={data.totalUsers > 0 ? 'დახურვა' : 'წაშლა'}
      >
        <Alert
          color="error"
          text={
            data.totalUsers > 0
              ? 'სისტემის მომხმარებლებს აქვთ მინიჭებული აღნიშნული როლი, როლის წაშლა შეუძლებელია'
              : 'დარწმუნებული ხართ რომ გსურთ მითითებული როლის წაშლა?'
          }
        />
        <div className="mt-4 flex items-center justify-between rounded-lg border border-gray-200 p-4">
          <div className="space-y-3">
            <p className="text-sm font-bold">{data.name}</p>
            <p className="text-xs">{data.description}</p>
          </div>
          <div className="flex gap-2">
            <HiOutlineUsers className="size-4" />
            <p className="text-xs">12</p>
          </div>
        </div>
      </RemoveModal>
    </>
  );
};

export default RemoveRoleModal;
