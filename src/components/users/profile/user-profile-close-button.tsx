'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IoMdClose } from 'react-icons/io';

const UserProfileCloseButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  return (
    <button
      type="button"
      className=""
      onClick={() => {
        params.delete('userProfile');
        router.push(`${pathname}?${params.toString()}`);
      }}
    >
      <IoMdClose />
    </button>
  );
};

export default UserProfileCloseButton;
