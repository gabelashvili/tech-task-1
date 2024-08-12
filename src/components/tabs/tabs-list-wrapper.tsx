import { getTabsAction } from '@/server-actions/tabs-actions';
import TabListItem from './tab-list-item';

const TabsListWrapper = async ({ searchParams }: { searchParams: { [key: string]: string } }) => {
  const { data } = await getTabsAction();

  return <div className="grid grid-cols-4 gap-3">{data?.map((item) => <TabListItem key={item.id} data={item} />)}</div>;
};

export default TabsListWrapper;
