'use client';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Popper from '../auth/popper';
import { FaRegUser } from 'react-icons/fa';
import { IoTrashBin } from 'react-icons/io5';
import { ReactNode, useEffect, useState } from 'react';
import RemoveModal from '../shared/remove-modal';
import Alert from '../shared/alert';
import UserAvatar from './user-avatar';
import { updateUserStatusAction } from '@/server-actions/users-actions';
import { RiDeviceRecoverLine } from 'react-icons/ri';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import SuccessDialog from '../shared/success-dialog';

const UserTableAction = ({ id, item }: { id: string; item: { [key: string]: string | number | ReactNode } }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();

  const [statusChangeModal, setStatusChangeModal] = useState(false);
  const [pending, setPending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUserStatusChange = async () => {
    setPending(true);
    await updateUserStatusAction(!item.disabled, id);
    setShowSuccess(true);
    setPending(false);
    setStatusChangeModal(false);
  };

  return (
    <>
      <SuccessDialog open={showSuccess} closeModal={() => setShowSuccess(false)} />
      <RemoveModal
        open={statusChangeModal}
        closeModal={() => setStatusChangeModal(false)}
        okPending={pending}
        onOk={handleUserStatusChange}
        title={item.disabled ? 'მომხმარებლის აღდგენა' : 'მომხმარებლის გაუქმება'}
        okLabel={item.disabled ? 'აღდგენა' : 'გაუქმება'}
      >
        <Alert color="error" text={`დარწმუნებული ხართ რომ გსურთ მითითებული მომხმარებლის ${item.disabled ? 'აღდგენა' : 'გაუქმება'}?`} />
        <div className="mt-4 flex items-center justify-between rounded-lg border border-gray-200 p-4">
          <div className="flex items-start gap-4">
            <UserAvatar label="SS" />
            <div>
              <p className="mb-1 text-start text-sm font-bold">
                {item?.firstName} {item?.lastName}{' '}
              </p>
              <p className="mb-3 text-start text-xs">{item?.position} </p>
              <p className="text-start text-sm">{item?.agency}</p>
            </div>
          </div>
        </div>
      </RemoveModal>
      <Popper
        disableSameWidth
        renderButton={(setReferenceElement, referenceElement) => (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setReferenceElement(referenceElement ? null : e.currentTarget);
            }}
            className="inline-flex size-6 items-center gap-2 text-sm text-black"
          >
            <BsThreeDotsVertical className="size-4" />
          </button>
        )}
        renderContent={(setReferenceElement) => (
          <ul className="rounded-lg bg-white shadow-lg">
            <li
              onClick={(e) => {
                e.stopPropagation();
                setReferenceElement(null);
                params.set('userProfile', id);
                router.push(`${pathname}?${params.toString()}`);
              }}
              className="flex cursor-pointer items-center gap-3 px-4 py-2.5 text-start text-sm text-gray-700"
            >
              <FaRegUser /> პროფილის ნახვა
            </li>
            <li
              className="flex cursor-pointer items-center gap-3 px-4 py-2.5 text-start text-sm text-red-700"
              onClick={(e) => {
                e.stopPropagation();
                setReferenceElement(null);
                setStatusChangeModal(true);
              }}
            >
              {item.disabled ? (
                <>
                  <RiDeviceRecoverLine /> მომხმარებლის აღდგენა
                </>
              ) : (
                <>
                  <IoTrashBin /> მომხმარებლის გაუქმება
                </>
              )}
            </li>
          </ul>
        )}
      />
    </>
  );
};

export default UserTableAction;
