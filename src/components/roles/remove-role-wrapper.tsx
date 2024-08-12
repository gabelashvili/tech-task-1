import { getRoleActions } from '@/server-actions/roles-actions';
import routes from '@/libs/routes';
import RemoveRoleModal from './remove-role-modal';
import { redirect } from 'next/navigation';

const RemoveRoleWrapper = async ({ searchParams }: { searchParams: { [key: string]: string } }) => {
  const { data } = await getRoleActions(searchParams.itemId);

  if (!data) {
    redirect(routes.roles.fullUrl);
  }

  return <RemoveRoleModal data={data!} />;
};

export default RemoveRoleWrapper;
