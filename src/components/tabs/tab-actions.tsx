'use client';

import Button from '../shared/button';
import { FC, useState } from 'react';
import UpsertTab from './upsert-tab-modal';
import { ITab, ITabLevel } from '@/types/tabs';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Popper from '../auth/popper';
import { RiDeviceRecoverLine } from 'react-icons/ri';
import { IoTrashBin } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md';
import Modal from '../shared/modal';

interface TabActionsProps {
  data: ITabLevel[];
  editItem: ITab;
}

const TabActions: FC<TabActionsProps> = ({ data, editItem }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);

  return (
    <>
      <Modal open={openRemove} closeModal={() => setOpenRemove(false)}>
        <div className="flex w-full max-w-3xl flex-col items-center justify-center rounded-lg bg-white shadow-sm">
          <IoTrashBin className="mt-8 size-8" />
          <h1 className="mt-6 font-bold">ნამდვილად გსურთ ჩანართის წაშლა?</h1>
          <div className="mt-16 space-x-3 pb-6">
            <Button onClick={() => setOpenRemove(false)} className="border border-gray-200 bg-transparent py-2 text-black">
              არა
            </Button>
            <Button onClick={() => setOpenRemove(false)} className="border border-gray-200 bg-transparent py-2 text-black">
              დიახ
            </Button>
          </div>
        </div>
      </Modal>
      <UpsertTab editItem={editItem} levels={data} open={openEdit} closeModal={() => setOpenEdit(false)} />
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
                setOpenEdit(true);
              }}
              className="flex cursor-pointer items-center gap-3 px-4 py-2.5 text-start text-sm text-gray-700"
            >
              <MdEdit /> ჩანართის რედაქტირება
            </li>
            <li
              className="flex cursor-pointer items-center gap-3 px-4 py-2.5 text-start text-sm text-red-700"
              onClick={(e) => {
                e.stopPropagation();
                setReferenceElement(null);
                setOpenRemove(true);
              }}
            >
              <IoTrashBin /> ჩანართის წაშლა
            </li>
          </ul>
        )}
      />
    </>
  );
};

export default TabActions;
