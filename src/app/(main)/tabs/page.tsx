import AddTab from '@/components/tabs/add-tab';
import ArchiveTab from '@/components/tabs/archive-tab';
import TabsListWrapper from '@/components/tabs/tabs-list-wrapper';
import AddUserWrapper from '@/components/users/add-user-wrapper';
import UsersSearch from '@/components/users/search/users-search';
import UserTableWrapper from '@/components/users/user-table-wrapper';
import { getTabLevelAction } from '@/server-actions/tabs-actions';
import { Suspense } from 'react';

const TabsPage = async ({ searchParams }: { searchParams: { [key: string]: string } }) => {
  const { data } = await getTabLevelAction();

  return (
    <>
      <div className="flex h-full w-full flex-col space-y-3">
        <div className="flex h-fit items-center gap-4 rounded-lg bg-white px-4 py-4 shadow-sm">
          <AddTab data={data || []} />
          <ArchiveTab levels={data || []} />
        </div>
        <Suspense key={JSON.stringify(searchParams)} fallback={<div className="h-96 w-full animate-pulse rounded-md bg-gray-200" />}>
          <TabsListWrapper searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
};

export default TabsPage;
