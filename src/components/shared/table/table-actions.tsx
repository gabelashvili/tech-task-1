'use client';

import { FC } from 'react';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin7Line } from 'react-icons/ri';

interface TableActionsProps {
  onEdit: () => void;
  onRemove: () => void;
}

const TableActions: FC<TableActionsProps> = ({ onEdit, onRemove }) => {
  return (
    <div className="flex w-fit justify-end rounded-md bg-white p-3 text-[#323232] shadow-sm">
      <div className="cursor-pointer p-2">
        <IoMdInformationCircleOutline className="size-5" />
      </div>
      <div className="cursor-pointer p-2" onClick={() => onEdit()}>
        <MdEdit className="size-5" />
      </div>
      <div className="cursor-pointer p-2" onClick={() => onRemove()}>
        <RiDeleteBin7Line className="size-5" />
      </div>
    </div>
  );
};

export default TableActions;
