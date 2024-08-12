'use client';

import Modal from '../../shared/modal';
import { IoMdClose } from 'react-icons/io';
import TextField from '../../shared/textfield';
import Button from '../../shared/button';
import Select from 'react-select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IRole } from '@/types/role';
import { RiFilter3Line } from 'react-icons/ri';

const FullFilter = ({ agencies, roles }: { agencies: { id: number; name: string }[] | null; roles: IRole[] | null }) => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    lastName: '',
    agency: '',
    role: '',
    position: '',
  });

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedRole = () => {
    const role = roles?.find((el) => el.id.toString() === filters.role);
    if (role) {
      return { value: role.id.toString(), label: role.name };
    }
    return null;
  };

  const selectedAgency = () => {
    const agency = agencies?.find((el) => el.id.toString() === filters.agency);
    if (agency) {
      return { value: agency.id.toString(), label: agency.name };
    }
    return null;
  };

  const onSubmit = () => {
    const newParams = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key as keyof typeof filters]) {
        newParams.set(key, filters[key as keyof typeof filters]);
      }
    });
    router.push(`${pathname}?${newParams.toString()}`);
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      setFilters({
        agency: searchParams.get('agency') || '',
        lastName: searchParams.get('lastName') || '',
        name: searchParams.get('name') || '',
        position: searchParams.get('position') || '',
        role: searchParams.get('role') || '',
      });
    }
  }, [open, searchParams]);

  return (
    <>
      <RiFilter3Line className="size-5 cursor-pointer" onClick={() => setOpen(true)} />
      <Modal open={open} closeModal={() => setOpen(false)}>
        <div className="w-96 rounded-lg bg-white p-6 pb-0 shadow-sm">
          <IoMdClose className="ml-auto" onClick={() => setOpen(false)} />
          <div className="space-y-3">
            <TextField
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
              label="სახელი"
              placeholder="ჩაწერეთ სახელი"
            />
            <TextField
              onChange={(e) => setFilters({ ...filters, lastName: e.target.value })}
              value={filters.lastName}
              label="გვარი"
              placeholder="ჩაწერეთ გვარი"
            />
            <Select
              placeholder="აირჩიეთ უწყება"
              styles={{
                control: (base) => ({
                  ...base,
                  height: 52,
                  minHeight: 52,
                  borderRadius: 8,
                }),
              }}
              options={agencies?.map((el) => ({ value: el.id.toString(), label: el.name })) || []}
              value={selectedAgency()}
              onChange={(newVal) => {
                setFilters({ ...filters, agency: newVal?.value || '' });
              }}
            />
            <TextField
              onChange={(e) => setFilters({ ...filters, position: e.target.value })}
              value={filters.position}
              label="თანამდებობა"
              placeholder="ჩაწერეთ თანამდებობა"
            />
            <Select
              styles={{
                control: (base) => ({
                  ...base,
                  height: 52,
                  minHeight: 52,
                  borderRadius: 8,
                }),
              }}
              placeholder={'აირჩიეთ სისტემური როლ'}
              options={roles?.map((el) => ({ value: el.id.toString(), label: el.name })) || []}
              value={selectedRole()}
              onChange={(newVal) => {
                setFilters({ ...filters, role: newVal?.value || '' });
              }}
            />
          </div>
          <div className="flex items-center justify-end gap-3 py-6">
            <Button
              className="py-2"
              variant="text"
              onClick={() => {
                router.push(`${pathname}`);
                setOpen(false);
              }}
            >
              გასუფთავება
            </Button>
            <Button onClick={onSubmit} className="py-2">
              ძებნა
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FullFilter;
