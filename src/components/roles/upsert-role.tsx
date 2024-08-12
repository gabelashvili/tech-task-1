'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import UpsertModal from '../shared/upsert-modal';
import TextField from '../shared/textfield';
import Permissions from './permissions';
import { useForm } from 'react-hook-form';
import { IRole, IUpsertRole } from '@/types/role';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpsertRoleSchema } from '@/schemas/roles';
import { useEffect, useState } from 'react';
import { addRoleActions, editRoleAction } from '@/server-actions/roles-actions';
import { toast } from 'react-toastify';
import SuccessDialog from '../shared/success-dialog';

const defaultValues = {
  name: '',
  description: '',
  permissions: {
    tabs: [],
    users: [],
  },
};

const UpsertRole = ({ data }: { data: IRole | null }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
    watch,
    reset,
    setValue,
  } = useForm<IUpsertRole>({
    resolver: zodResolver(UpsertRoleSchema),
    defaultValues,
  });

  const closeModal = () => {
    params.delete('upsert');
    params.delete('itemId');
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handlePermissionChange = (key: keyof IUpsertRole['permissions'], value: number) => {
    setValue(
      `permissions.${key}`,
      watch(`permissions.${key}`).includes(value)
        ? watch(`permissions.${key}`).filter((el) => el !== value)
        : [...watch(`permissions.${key}`), value],
      { shouldValidate: isSubmitted },
    );
  };

  const onSubmit = handleSubmit(async (values) => {
    const { errorMessage } = params.get('itemId') ? await editRoleAction(values, params.get('itemId')!) : await addRoleActions(values);
    if (errorMessage) {
      toast.error('მოხდა შეცდომა...');
    } else {
      closeModal();
      reset(defaultValues);
      setShowSuccess(true);
    }
  });

  useEffect(() => {
    if (data) {
      reset({
        description: data.description,
        name: data.name,
        permissions: {
          tabs: data.permissions.tabs?.map((el) => el.id) || [],
          users: data.permissions.users?.map((el) => el.id) || [],
        },
      });
    }
  }, [data, reset]);

  useEffect(() => {
    if (!open) {
      reset(defaultValues);
    }
  }, [reset]);

  return (
    <>
      <SuccessDialog open={showSuccess} closeModal={() => setShowSuccess(false)} />
      <UpsertModal
        variant="secondary"
        closeModal={closeModal}
        open={!!params.get('upsert')}
        onCancel={closeModal}
        onOk={onSubmit}
        okLabel={params.get('itemId') ? 'შენახვა' : 'დამატება'}
        title={params.get('itemId') ? 'როლის რედაქტირება' : 'როლის დამატება'}
        okPending={isSubmitting}
      >
        <div className="space-y-4">
          <div className="space-y-2.5">
            <TextField required label="როლის სახელწოდება" {...register('name')} error={!!errors.name} errorText={errors.name?.message} />
            <TextField label="როლის აღწერა" {...register('description')} />
          </div>
          <Permissions values={watch('permissions')} onChange={handlePermissionChange} />
        </div>
      </UpsertModal>
    </>
  );
};

export default UpsertRole;
