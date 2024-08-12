import AddRoleButton from '@/components/roles/add-role-button';
import RemoveRoleWrapper from '@/components/roles/remove-role-wrapper';
import RolesTable from '@/components/roles/roles-table';
import UpsertRoleWrapper from '@/components/roles/upsert-role-wrapper';
import { getAuthedUserAction } from '@/server-actions/auth-actions';
import { getRolesActions } from '@/server-actions/roles-actions';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

const RolesPage = async ({ searchParams }: { searchParams: { [key: string]: string } }) => {
  const { data } = await getRolesActions();
  const user = await getAuthedUserAction();

  if (user?.role !== 1) {
    redirect('/');
  }

  return (
    <>
      {searchParams?.remove && searchParams?.itemId && (
        <Suspense fallback={<div className="h-52 w-full animate-pulse rounded-lg bg-gray-200" />}>
          <RemoveRoleWrapper searchParams={searchParams} />
        </Suspense>
      )}
      <Suspense fallback={<div className="h-52 w-full animate-pulse rounded-lg bg-gray-200" />}>
        <UpsertRoleWrapper searchParams={searchParams} />
      </Suspense>
      <div className="rounded-lg bg-white shadow-sm">
        <div className="flex items-center justify-between gap-2 px-4 py-4">
          <AddRoleButton />
          <p className="text-sm text-[#636971]">სულ {data?.length}</p>
        </div>
        {data && <RolesTable data={data} />}
      </div>
    </>
  );
};

export default RolesPage;
