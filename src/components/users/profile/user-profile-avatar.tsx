'use client';
import { MdEdit } from 'react-icons/md';
import { IoTrashBin } from 'react-icons/io5';
import { useState } from 'react';
import UserAvatarUpload from './user-avatar-upload';

const UserProfileAvatar = () => {
  const [showUpload, setShowUpload] = useState(false);
  return (
    <>
      <UserAvatarUpload open={showUpload} closeModal={() => setShowUpload(false)} />
      <div className="group relative size-12 rounded-full bg-gray-200">
        <div className="absolute bottom-0 left-1/2 hidden -translate-x-1/2 translate-y-full transform items-center gap-4 rounded-full bg-white px-4 py-2 text-[#323232] shadow-xl group-hover:flex">
          <MdEdit className="cursor-pointer" onClick={() => setShowUpload(true)} />
          <IoTrashBin className="cursor-pointer" />
        </div>
      </div>
    </>
  );
};

export default UserProfileAvatar;
