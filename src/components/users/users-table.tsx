'use client';

import { FC, useState } from 'react';
import Table from '../shared/table/table';
import { useSearchParams } from 'next/navigation';
import { IUser } from '@/types/user';
import UserTableAction from './user-table-action';
import UserAvatar from './user-avatar';
import AddUserWrapper from './add-user-wrapper';
import AddUser from './add-user';
import { IRole } from '@/types/role';
import UpsertUser from './upsert-user/upsert-user';
import UserProfile from './profile/user-profile';

const headers = [
  {
    label: '',
    key: 'avatar',
    align: 'left' as const,
  },
  {
    label: 'სახელი',
    key: 'firstName',
    align: 'left' as const,
  },
  {
    label: 'გვარი',
    key: 'lastName',
    align: 'center' as const,
  },
  {
    label: 'უწყება',
    key: 'agency',
    align: 'center' as const,
  },
  {
    label: 'თანამდებობა',
    key: 'position',
    align: 'center' as const,
  },
  {
    label: 'ელ.ფოსტა',
    key: 'email',
    align: 'center' as const,
  },
  {
    label: 'მობილური',
    key: 'mobile',
    align: 'center' as const,
  },
];

interface UsersTableProps {
  data: IUser[];
  roles: IRole[];
  agencies: { id: number; name: string }[];
}

const UsersTable: FC<UsersTableProps> = ({ data, agencies, roles }) => {
  const [editItem, setEditItem] = useState<null | IUser>(null);

  const rows = data.map((el) => ({
    avatar: <UserAvatar label={`${el.name[0]}${el.lastName[0]}`} src={el.file} />,
    firstName: el.name,
    lastName: el.lastName,
    agency: el?.agency?.name || '',
    position: el.position,
    id: el.id,
    mobile: el.mobile,
    email: el.email,
    disabled: el?.disabled,
  }));

  return (
    <>
      <UpsertUser agencies={agencies} roles={roles} open={!!editItem} editItem={editItem} closeModal={() => setEditItem(null)} />
      <div className="overflow-auto">
        <Table
          onClick={(id) => {
            const item = data.find((el) => el.id === id);
            if (item) {
              setEditItem(item);
            }
          }}
          headers={headers}
          rows={rows}
          actions={(itemId, item) => <UserTableAction id={itemId} item={item} />}
        />
      </div>
    </>
  );
};

export default UsersTable;
