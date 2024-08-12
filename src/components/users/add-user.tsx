'use client';

import Button from '../shared/button';
import { FC, useEffect, useState } from 'react';
import { IRole } from '@/types/role';
import UpsertUser from './upsert-user/upsert-user';

const genders = [
  { label: 'მამრ.', value: 'male' },
  { label: 'მდედრ.', value: 'female' },
];

interface UpsertUserProps {
  agencies: { id: number; name: string }[] | null;
  roles: IRole[] | null;
}

const AddUser: FC<UpsertUserProps> = ({ agencies, roles }) => {
  const [open, setOpen] = useState(false);
  // const onSubmit = handleSubmit(async (data) => {
  //   const { errorMessage } = await addUserAction(data);
  //   if (errorMessage) {
  //     toast.error(errorMessage);
  //   } else {
  //     closeModal();
  //   }
  // });

  return (
    <>
      <UpsertUser open={open} closeModal={() => setOpen(false)} agencies={agencies || []} roles={roles || []} />
      <Button onClick={() => setOpen(true)} className="bg-[#EEF4FF] px-3.5 py-2 text-sm text-[#2970FF]">
        დამატება
      </Button>
    </>
  );
};

export default AddUser;
