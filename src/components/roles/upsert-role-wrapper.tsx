import { getRoleActions } from '@/server-actions/roles-actions';
import UpsertRole from './upsert-role';
import { IRole } from '@/types/role';
import { ResponseModel } from '@/types/common';

const UpsertRoleWrapper = async ({ searchParams }: { searchParams: { [key: string]: string } }) => {
  let role: ResponseModel<IRole | null> = { data: null, errorMessage: null };

  if (searchParams?.itemId) {
    role = await getRoleActions(searchParams.itemId);
  }

  return <UpsertRole data={role.data} />;
};

export default UpsertRoleWrapper;
