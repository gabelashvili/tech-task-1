import { getAgenciesAction } from '@/server-actions/agency-actions';
import AddUser from './add-user';
import { getRolesActions } from '@/server-actions/roles-actions';

const AddUserWrapper = async () => {
  const { data: roles } = await getRolesActions();
  const { data: agencies } = await getAgenciesAction();

  return <AddUser roles={roles} agencies={agencies} />;
};

export default AddUserWrapper;
