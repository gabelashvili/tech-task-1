import React, { FC, useState } from 'react';
import { CiCircleCheck } from 'react-icons/ci';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { MdOutlineRadioButtonUnchecked } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';
import { cn } from '@/libs/libs';
import { IUpsertRole } from '@/types/role';
interface PermissionsProps {
  values: IUpsertRole['permissions'];
  onChange: (key: keyof IUpsertRole['permissions'], value: number) => void;
}

const Permissions: FC<PermissionsProps> = ({ values, onChange }) => {
  const [open, setOpen] = useState<'tabs' | 'users' | 'roles' | null>(null);

  const handleCollapse = (tab: typeof open) => {
    setOpen(tab === open ? null : tab);
  };

  return (
    <div className="max-h-[40vh] space-y-6 overflow-auto rounded-lg border border-gray-200 p-3">
      {list.map((el) => (
        <div className="space-y-3" key={el.key}>
          <div
            onClick={() => handleCollapse(el.key as keyof IUpsertRole['permissions'])}
            className="flex w-full cursor-pointer items-center justify-between px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold">{el.label}</p>
              {values[el.key as keyof IUpsertRole['permissions']].length > 0 && (
                <>
                  <CiCircleCheck className="size-3.5 text-[#2970FF]" />
                  <p className="text-sm text-[#2970FF]">{values[el.key as keyof IUpsertRole['permissions']].length}</p>
                </>
              )}
            </div>
            {open === el.key ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </div>
          {open === el.key && (
            <div className="space-y-3">
              {el.permissions.map((permission) => (
                <div
                  key={permission.key + el.key}
                  onClick={() => onChange(el.key as keyof IUpsertRole['permissions'], permission.key)}
                  className={cn(
                    'flex w-full cursor-pointer items-baseline justify-between rounded-lg border border-transparent bg-white p-4',
                    values[el.key as keyof IUpsertRole['permissions']].includes(permission.key) && 'border-[#84ADFF] bg-[#EEF4FF]',
                  )}
                >
                  <div>
                    <p
                      className={cn(
                        'font-medium text-gray-700',
                        values[el.key as keyof IUpsertRole['permissions']].includes(permission.key) && 'text-[#0A3998]',
                      )}
                    >
                      {permission.label}
                    </p>
                    <p
                      className={cn(
                        'text-sm text-gray-500',
                        values[el.key as keyof IUpsertRole['permissions']].includes(permission.key) && 'text-[#1F5EDD]',
                      )}
                    >
                      მომხმარებელს შეუძლია {permission.label}
                    </p>
                  </div>
                  {values[el.key as keyof IUpsertRole['permissions']].includes(permission.key) ? (
                    <FaCheckCircle className="size-4 text-[#1F5EDD]" />
                  ) : (
                    <MdOutlineRadioButtonUnchecked className="size-4 text-gray-300" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Permissions;

const list = [
  {
    label: 'ჩანართები',
    key: 'tabs',
    permissions: [
      {
        label: 'ჩანართის ᲓᲐᲛᲐᲢᲔᲑᲐ',
        key: 1,
      },
      {
        label: 'ჩანართის ᲬᲐᲨᲚᲐ',
        key: 2,
      },
      {
        label: 'ჩანართის რედაქტირება',
        key: 3,
      },
      {
        label: 'ჩანართის წაᲮᲕᲐ',
        key: 4,
      },
    ],
  },
  {
    label: 'მომხმარებლებ',
    key: 'users',
    permissions: [
      {
        label: 'მომხმარებლის ᲓᲐᲛᲐᲢᲔᲑᲐ',
        key: 1,
      },
      {
        label: 'მომხმარებლის ᲬᲐᲨᲚᲐ',
        key: 2,
      },
      {
        label: 'მომხმარებლის რედაქტირება',
        key: 3,
      },
      {
        label: 'მომხმარებლის წაᲮᲕᲐ',
        key: 4,
      },
    ],
  },
  // {
  //   label: 'როლები',
  //   key: 'roles',
  //   permissions: [
  //     {
  //       label: 'როლების ᲓᲐᲛᲐᲢᲔᲑᲐ',
  //       key: 1,
  //     },
  //     {
  //       label: 'როლების ᲬᲐᲨᲚᲐ',
  //       key: 2,
  //     },
  //     {
  //       label: 'როლების რედაქტირება',
  //       key: 3,
  //     },
  //     {
  //       label: 'როლების წაᲮᲕᲐ',
  //       key: 4,
  //     },
  //   ],
  // },
];
