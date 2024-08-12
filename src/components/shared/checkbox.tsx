'use client';

import { ChangeEvent, FC, ReactNode } from 'react';
import { ImCheckboxUnchecked } from 'react-icons/im';
import { ImCheckboxChecked } from 'react-icons/im';

import { cn } from '@/libs/libs';

interface CheckBoxProps {
  name?: string;
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: ReactNode;
}

const CheckBox: FC<CheckBoxProps> = ({ name, checked, onChange, label }) => (
  <label className={cn('flex select-none items-center gap-2')}>
    <input checked={checked} className="peer relative hidden h-4 w-4 appearance-none" type="checkbox" name={name} onChange={onChange} />
    <ImCheckboxUnchecked size={14} className={'block rounded-[2px] text-gray-600 peer-checked:hidden'} />
    <ImCheckboxChecked fontSize={14} className="hidden rounded-[2px] text-gray-600 peer-checked:block [&>path]:!h-6 [&>path]:!w-6" />
    {label && <p className="text-sm text-gray-700">{label}</p>}
  </label>
);

export default CheckBox;
