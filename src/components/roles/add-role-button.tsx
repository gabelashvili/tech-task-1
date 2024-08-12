'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Button from '../shared/button';

const AddRoleButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const openUpsert = () => {
    params.set('upsert', 'true');
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Button onClick={openUpsert} className="bg-[#EEF4FF] px-3.5 py-2 text-sm text-[#2970FF]">
      დამატება
    </Button>
  );
};

export default AddRoleButton;
