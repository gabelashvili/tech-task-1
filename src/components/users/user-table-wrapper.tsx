import React from 'react';
import UsersTable from './users-table';
import { getUsersAction } from '@/server-actions/users-actions';
import { getAgenciesAction } from '@/server-actions/agency-actions';
import { getRolesActions } from '@/server-actions/roles-actions';

const delay = () => new Promise((resolve) => setTimeout(resolve, 50000));
const UserTableWrapper = async ({ searchParams }: { searchParams: { [key: string]: string } }) => {
  const { data } = await getUsersAction(searchParams);
  const { data: roles } = await getRolesActions();
  const { data: agencies } = await getAgenciesAction();

  return data && <UsersTable data={data} agencies={agencies || []} roles={roles || []} />;
};

export default UserTableWrapper;
