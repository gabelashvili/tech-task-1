import React from 'react';
import { MdEdit } from 'react-icons/md';
import UserAvatar from '../user-avatar';
import { FaGenderless } from 'react-icons/fa';
import { IoIosDocument } from 'react-icons/io';
import { FaBuildingColumns } from 'react-icons/fa6';
import { IoMdDocument } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import { FaPhone } from 'react-icons/fa';
import { getUserAction } from '@/server-actions/users-actions';
import UserProfileCloseButton from './user-profile-close-button';
import UserProfileEditButton from './user-profile-edit-button';
import { getRolesActions } from '@/server-actions/roles-actions';
import { getAgenciesAction } from '@/server-actions/agency-actions';
import UserProfileAvatar from './user-profile-avatar';

const UserProfile = async ({ userId }: { userId?: string }) => {
  if (!userId) {
    return null;
  }
  const { data } = await getUserAction(userId!);
  const { data: roles } = await getRolesActions();
  const { data: agencies } = await getAgenciesAction();

  return (
    <div className="relative max-h-screen w-80 min-w-80 rounded-lg bg-white pb-2 shadow-md">
      <div className="flex justify-between p-4 text-[#1A1F36]">
        <UserProfileCloseButton />

        <p className="text-sm">
          {data?.name} {data?.lastName}
        </p>
        {data && <UserProfileEditButton agencies={agencies} roles={roles} editItem={data} />}
      </div>
      <div className="flex gap-4 p-4">
        <UserProfileAvatar />
        <div className="space-y-3">
          <p className="text-sm text-[#1A1F36]">
            {data?.name} {data?.lastName}
          </p>
          <p className="text-[#1A1F36 rounded-lg bg-[#F5F8FF] px-3 py-1 text-sm">{data?.role.name}</p>
        </div>
      </div>
      <div className="space-y-3 px-2">
        <div>
          <p className="px-3 py-2.5 text-xs text-gray-400">პირადი ინფორმაცია</p>
          <ul className="rounded-lg border border-gray-200 p-3">
            <li className="flex items-center py-3 text-sm">
              <FaGenderless className="mr-2 size-4" /> {data?.gender === 'female' ? 'მდედრობითი' : 'მამრობითი'}
            </li>
            <li className="flex items-center py-3 text-sm">
              <IoIosDocument className="mr-2 size-4" /> {data?.idNumber}
            </li>
            <li className="flex items-center py-3 text-sm">
              <FaBuildingColumns className="mr-2 size-4" /> {data?.agency?.name}
            </li>
            <li className="flex items-center py-3 text-sm">
              <IoMdDocument className="mr-2 size-4" /> {data?.position}
            </li>
          </ul>
        </div>
        <div>
          <p className="px-3 py-2.5 text-xs text-gray-400">საკონტაქტო ინფორმაცია</p>
          <ul className="rounded-lg border border-gray-200 p-3">
            <li className="flex items-center py-3 text-sm">
              <MdEmail className="mr-2 size-4" /> {data?.email}
            </li>
            <li className="flex items-center py-3 text-sm">
              <FaPhone className="mr-2 size-4" /> {data?.phone}
            </li>
            <li className="flex items-center py-3 text-sm">
              <FaPhone className="mr-2 size-4" /> {data?.mobile}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
