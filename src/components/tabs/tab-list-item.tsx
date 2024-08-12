import { getTabLevelAction } from '@/server-actions/tabs-actions';
import { ITab } from '@/types/tabs';
import moment from 'moment';
import Image from 'next/image';
import React from 'react';
import TabActions from './tab-actions';

const getIcon = (id: string | number) => {
  if (id === 1) {
    return 'sectoral';
  }
  if (id === 2) {
    return 'institutional';
  }
  if (id === 2) {
    return 'nation';
  }
  return 'archive';
};

const TabListItem = async ({ data }: { data: ITab }) => {
  const { data: levels } = await getTabLevelAction();

  return (
    <div className="group relative flex flex-col rounded-lg bg-white p-3">
      <div className="absolute right-2 top-2 hidden group-hover:block">
        <TabActions editItem={data} data={levels || []} />
      </div>
      <div className="mx-auto space-y-2.5 py-6">
        <div className="relative mx-auto h-8 w-9">
          <Image src={`/${getIcon(data.document_level_id)}.svg`} alt="" fill />
        </div>
        <p className="text-[10px] text-[#637281]">{moment(data.createdAt).format('MM/DD/YYYY')}</p>
      </div>
      <p className="px-2 text-sm font-medium">{data.name}</p>
      <div className="mt-4 flex items-center justify-between gap-2 px-2">
        <p className="text-xs text-[#637281]">{data.name_code}</p>
        <p className="text-xs text-[#637281]">{levels?.find((el) => el.id === data.document_level_id)?.name}</p>
      </div>
    </div>
  );
};

export default TabListItem;
