'use client';

import routes from '@/libs/routes';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const routeLabel = (route: string) => {
  switch (route) {
    case routes.tabs.fullUrl:
      return 'ჩანართები';
    case routes.users.fullUrl:
      return 'მომხმარებლები';
    default:
      return 'როლები';
  }
};
const Header = () => {
  const pathname = usePathname();

  return (
    <div className="flex w-full items-center justify-between gap-2 px-6 py-4">
      <p>{routeLabel(pathname)}</p>
      <div className="flex items-center gap-3">
        <div className="relative size-6">
          <Image src={'/avatar.svg'} fill alt="" />
        </div>
        <p>სახელი</p>
      </div>
    </div>
  );
};

export default Header;
