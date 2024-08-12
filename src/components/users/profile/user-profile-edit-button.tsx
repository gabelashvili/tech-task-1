'use client';

import { FC, useState } from 'react';
import { IRole } from '@/types/role';
import { MdEdit } from 'react-icons/md';
import UpsertUser from '../upsert-user/upsert-user';
import { IUser } from '@/types/user';

interface UpsertUserProps {
  agencies: { id: number; name: string }[] | null;
  roles: IRole[] | null;
  editItem: IUser;
}

const UserProfileEditButton: FC<UpsertUserProps> = ({ agencies, roles, editItem }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <UpsertUser editItem={editItem} open={open} closeModal={() => setOpen(false)} agencies={agencies || []} roles={roles || []} />
      <button type="button" className="cursor-pointer" onClick={() => setOpen(true)}>
        <MdEdit />
      </button>
    </>
  );
};

export default UserProfileEditButton;
