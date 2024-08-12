import AddUserWrapper from '@/components/users/add-user-wrapper';
import UserProfile from '@/components/users/profile/user-profile';
import UsersSearch from '@/components/users/search/users-search';
import UserTableWrapper from '@/components/users/user-table-wrapper';
import { Suspense } from 'react';

const UsersPage = ({ searchParams }: { searchParams: { [key: string]: string } }) => {
  const { userProfile, ...params } = searchParams;
  return (
    <>
      <div className="flex gap-2.5">
        <div className="grid h-full w-full overflow-hidden rounded-lg bg-white shadow-sm">
          <div className="flex items-center gap-4 px-4 py-4">
            <Suspense>
              <AddUserWrapper />
            </Suspense>
            <UsersSearch />
          </div>
          <Suspense key={JSON.stringify(params)} fallback={<div className="h-96 w-full animate-pulse rounded-md bg-gray-200" />}>
            <UserTableWrapper searchParams={params} />
          </Suspense>
        </div>
        <Suspense fallback={<div className="h-96 w-full animate-pulse rounded-md bg-gray-200" />}>
          <UserProfile userId={userProfile} />
        </Suspense>
      </div>
    </>
  );
};

export default UsersPage;
