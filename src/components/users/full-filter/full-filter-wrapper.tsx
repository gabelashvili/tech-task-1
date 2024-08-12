import { getAgenciesAction } from '@/server-actions/agency-actions';
import { getRolesActions } from '@/server-actions/roles-actions';
import FullFilter from './full-filter';

const FullFilterWrapper = async () => {
  const { data: roles } = await getRolesActions();
  const { data: agencies } = await getAgenciesAction();

  return <FullFilter roles={roles} agencies={agencies} />;
};

export default FullFilterWrapper;
