'use client';

import Button from '../shared/button';
import { FC, useState } from 'react';
import UpsertArchiveModal from './upsert-archive-modal';
import { ITabLevel } from '@/types/tabs';

interface ArchiveTabProps {
  levels: ITabLevel[];
}

const ArchiveTab: FC<ArchiveTabProps> = ({ levels }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <UpsertArchiveModal open={open} closeModal={() => setOpen(false)} levels={levels} />
      <Button onClick={() => setOpen(true)} className="border border-gray-200 bg-transparent px-3.5 py-2 text-sm text-gray-700">
        არქივში დამატება
      </Button>
    </>
  );
};

export default ArchiveTab;
