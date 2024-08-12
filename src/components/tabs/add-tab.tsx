'use client';

import Button from '../shared/button';
import { FC, useState } from 'react';
import UpsertTab from './upsert-tab-modal';
import { ITabLevel } from '@/types/tabs';

interface AddTabProps {
  data: ITabLevel[];
}

const AddTab: FC<AddTabProps> = ({ data }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <UpsertTab levels={data} open={open} closeModal={() => setOpen(false)} />
      <Button onClick={() => setOpen(true)} className="bg-[#EEF4FF] px-3.5 py-2 text-sm text-[#2970FF]">
        ახალი ჩანართი
      </Button>
    </>
  );
};

export default AddTab;
