'use client';

import { cn } from '@/libs/libs';
import routes from '@/libs/routes';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiOutlineDocumentDuplicate } from 'react-icons/hi2';
import { LuUsers2 } from 'react-icons/lu';
import { TiDocument } from 'react-icons/ti';

const NavBar = ({ user }: { user: { id: number; username: string; role: number } | null }) => {
  const pathname = usePathname();
  const isActive = (route: string) => route === pathname;

  return (
    <div className="group fixed top-2 z-10 mx-2.5 h-[98vh] rounded-[10px] bg-white shadow-sm hover:shadow-[4px_4px_18px_0px_#0000001C] [&:hover_span]:!block">
      <div className="mb-16 flex items-center gap-2 px-5 py-2.5">
        <div className="relative h-[28px] w-[37px]">
          <Image src={'/logo-icon.svg'} alt="" fill />
        </div>
        <span className="hidden max-w-52 text-[8px] font-medium">პოლიტიკის დაგეგმვისა და კორდინაციის მართვის ელექტრონული სისტემა</span>
      </div>
      <ul className="[&>a>.active]:border-l-[#2970FF] [&>a>.active]:bg-[#F5F8FF] [&>a>.active]:text-[#0A3998] [&_svg]:mx-auto [&_svg]:-translate-x-1 group-hover:[&_svg]:mx-3">
        <Link href={routes.tabs.fullUrl}>
          <li
            className={cn(
              'flex cursor-pointer items-center border-l-2 border-l-transparent py-3 text-sm hover:border-l-[#2970FF] hover:bg-[#F5F8FF] hover:text-[#0A3998]',
              isActive(routes.tabs.fullUrl) && 'active',
            )}
          >
            <HiOutlineDocumentDuplicate className="size-5" /> <span className="hidden">ჩანართები</span>
          </li>
        </Link>
        <Link href={routes.users.fullUrl}>
          <li
            className={cn(
              'flex cursor-pointer items-center border-l-2 border-l-transparent py-3 text-sm hover:border-l-[#2970FF] hover:bg-[#F5F8FF] hover:text-[#0A3998]',
              isActive(routes.users.fullUrl) && 'active',
            )}
          >
            <LuUsers2 className="size-5" /> <span className="hidden">მომხმარებლები</span>
          </li>
        </Link>
        {user?.role === 1 && (
          <Link href={routes.roles.fullUrl}>
            <li
              className={cn(
                'flex cursor-pointer items-center border-l-2 border-l-transparent py-3 text-sm hover:border-l-[#2970FF] hover:bg-[#F5F8FF] hover:text-[#0A3998]',
                isActive(routes.roles.fullUrl) && 'active',
              )}
            >
              <TiDocument className="size-5" /> <span className="hidden">როლები</span>
            </li>
          </Link>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
