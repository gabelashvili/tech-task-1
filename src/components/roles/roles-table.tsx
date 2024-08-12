'use client';

import { FC } from 'react';
import Table from '../shared/table/table';
import { FiUsers } from 'react-icons/fi';
import { IRole } from '@/types/role';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import TableActions from '../shared/table/table-actions';

const headers = [
  {
    label: 'სახელი',
    key: 'name',
    align: 'left' as const,
  },
  {
    label: 'აღწერა',
    key: 'description',
    align: 'center' as const,
  },
  {
    label: <FiUsers />,
    key: 'users',
    align: 'center' as const,
  },
];

interface UsersTableProps {
  data: IRole[];
}

const UsersTable: FC<UsersTableProps> = ({ data }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const rows = data.map((el) => ({ name: el.name, description: el.description, users: el.totalUsers, id: el.id }));

  return (
    <Table
      headers={headers}
      rows={rows}
      actions={(itemId) => (
        <TableActions
          onEdit={() => {
            params.set('upsert', 'true');
            params.set('itemId', itemId);
            router.push(`${pathname}?${params.toString()}`);
          }}
          onRemove={() => {
            params.set('remove', 'true');
            params.set('itemId', itemId);
            router.push(`${pathname}?${params.toString()}`);
          }}
        />
      )}
    />
  );
};

export default UsersTable;
