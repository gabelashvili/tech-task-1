'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IoSearchSharp } from 'react-icons/io5';
import { cn } from '@/libs/libs';
import { TiDelete } from 'react-icons/ti';
import { useEffect, useRef } from 'react';

const SearchInput = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleSearch = (value: string) => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      params.set('search', value);
      router.push(`${pathname}?${params.toString()}`);
    }, 300);
  };

  useEffect(() => {
    return () => {
      window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      <IoSearchSharp />
      <input
        defaultValue={params.get('search') || ''}
        className={cn('focus:group:outline-none rounded-lg px-1 py-1.5 !outline-none placeholder:text-gray-500 focus:shadow-none')}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <TiDelete
        className="size-5 cursor-pointer"
        onClick={() => {
          params.delete('search');
          router.push(`${pathname}?${params.toString()}`);
        }}
      />
    </>
  );
};

export default SearchInput;
