'use client';

import SuccessDialog from '@/components/shared/success-dialog';
import TextField from '@/components/shared/textfield';
import UpsertModal from '@/components/shared/upsert-modal';
import { UpsertUserSchema } from '@/schemas/users';
import { addUserAction, updateUserAction } from '@/server-actions/users-actions';
import { IRole } from '@/types/role';
import { IUpsertUser, IUser } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { toast } from 'react-toastify';

interface UpsertUserProps {
  open: boolean;
  closeModal: () => void;
  roles: IRole[];
  agencies: { id: number; name: string }[];
  editItem?: IUser | null;
}

const genders = [
  { label: 'მამრ.', value: 'male' },
  { label: 'მდედრ.', value: 'female' },
];

const UpsertUser: FC<UpsertUserProps> = ({ closeModal, open, agencies, roles, editItem }) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
    watch,
    reset,
    setValue,
  } = useForm<IUpsertUser>({
    resolver: zodResolver(UpsertUserSchema),
  });

  const selectedGender = () => {
    const gender = genders.find((el) => el.value === watch('gender'));
    if (gender) {
      return { value: gender.value, label: gender.label };
    }
    return null;
  };

  const selectedRole = () => {
    const role = roles?.find((el) => el.id === watch('role'));
    if (role) {
      return { value: role.id.toString(), label: role.name };
    }
    return null;
  };

  const selectedAgency = () => {
    const agency = agencies?.find((el) => el.id === watch('agency'));
    if (agency) {
      return { value: agency.id.toString(), label: agency.name };
    }
    return null;
  };

  const onSubmit = handleSubmit(async (data) => {
    const { errorMessage } = editItem ? await updateUserAction(data, editItem.id.toString()) : await addUserAction(data);
    if (errorMessage) {
      toast.error(errorMessage);
    } else {
      closeModal();
      setShowSuccess(true);
    }
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  useEffect(() => {
    if (editItem) {
      reset({
        agency: editItem?.agency?.id,
        email: editItem.email,
        gender: editItem?.gender,
        idNumber: editItem?.idNumber,
        lastName: editItem.lastName,
        lastName_eng: editItem.lastName_eng,
        mobile: editItem.mobile,
        name: editItem.name,
        name_eng: editItem.name_eng,
        phone: editItem.phone,
        position: editItem.position,
        position_eng: editItem?.position_eng,
        role: editItem?.role?.id,
      });
    }
  }, [editItem, reset]);

  return (
    <>
      <SuccessDialog open={showSuccess} closeModal={() => setShowSuccess(false)} />
      <UpsertModal
        title="მომხმარებლის დამატება"
        closeModal={closeModal}
        onCancel={closeModal}
        onOk={onSubmit}
        okPending={isSubmitting}
        open={open}
        className="w-full"
        okLabel={editItem ? 'შენახვა' : 'დამატება'}
      >
        <div className="grid max-h-[60vh] w-full grid-cols-2 gap-6 overflow-auto">
          <TextField placeholder="ჩაწერე სახელი (ქარ)" label="სახელი (ქარ)" required {...register('name')} error={!!errors.name} />
          <TextField placeholder="ჩაწერე სახელი (ENG)" label="სახელი (ENG)" {...register('name_eng')} error={!!errors.name_eng} />
          <TextField placeholder="ჩაწერე გვარი (ქარ)" label="გვარი (ქარ)" required {...register('lastName')} error={!!errors.lastName} />
          <TextField placeholder="ჩაწერე გვარი (ENG)" label="გვარი (ENG)" {...register('lastName_eng')} error={!!errors.lastName_eng} />
          <TextField placeholder="ჩაწერე პირადი ნომერი" label="პირადი ნომერი" {...register('idNumber')} error={!!errors.idNumber} />
          <div className="space-y-1.5">
            <p className="text-sm">
              სქესი
              <span className="ml-1 text-red-700">*</span>
            </p>
            <Select
              styles={{
                control: (base) => ({
                  ...base,
                  height: 52,
                  minHeight: 52,
                  borderRadius: 8,
                  borderColor: errors.gender && 'red !important',
                  outline: errors.gender && 'none !important',
                  boxShadow: errors.gender && 'none !important',
                }),
              }}
              placeholder={'აირჩიეთ სქესი'}
              options={genders}
              value={selectedGender()}
              onChange={(newVal) => {
                if (newVal) {
                  setValue('gender', newVal.value as any, { shouldValidate: isSubmitted });
                }
              }}
            />
          </div>
          <TextField placeholder="ჩაწერე თანამდებობა" label="თანამდებობა" {...register('position')} error={!!errors.position} required />
          <TextField
            placeholder="ჩაწერე თანამდებობა (eng)"
            label="თანამდებობა (eng)"
            {...register('position_eng')}
            error={!!errors.position_eng}
          />
          <div className="space-y-1.5">
            <p className="text-sm">
              უწყება
              <span className="ml-1 text-red-700">*</span>
            </p>
            <Select
              styles={{
                control: (base) => ({
                  ...base,
                  height: 52,
                  minHeight: 52,
                  borderRadius: 8,
                  borderColor: errors.agency && 'red !important',
                  outline: errors.agency && 'none !important',
                  boxShadow: errors.agency && 'none !important',
                }),
              }}
              placeholder={'აირჩიეთ უწყება'}
              options={agencies?.map((el) => ({ value: el.id.toString(), label: el.name }))}
              value={selectedAgency()}
              onChange={(newVal) => {
                if (newVal) {
                  setValue('agency', Number(newVal.value), { shouldValidate: isSubmitted });
                }
              }}
            />
          </div>
          <div className="space-y-1.5">
            <p className="text-sm">
              როლი
              <span className="ml-1 text-red-700">*</span>
            </p>
            <Select
              styles={{
                control: (base) => ({
                  ...base,
                  height: 52,
                  minHeight: 52,
                  borderRadius: 8,
                  borderColor: errors.role && 'red !important',
                  outline: errors.role && 'none !important',
                  boxShadow: errors.role && 'none !important',
                }),
              }}
              placeholder={'აირჩიეთ სისტემური როლი'}
              options={roles?.map((el) => ({ value: el.id.toString(), label: el.name }))}
              value={selectedRole()}
              onChange={(newVal) => {
                if (newVal) {
                  setValue('role', Number(newVal.value), { shouldValidate: isSubmitted });
                }
              }}
            />
          </div>

          <TextField
            placeholder="ჩაწერე ელ.ფოსტა"
            className="col-span-2"
            label="ელ.ფოსტა"
            required
            {...register('email')}
            error={!!errors.email}
          />
          <TextField placeholder="ჩაწერე მობილური" label="მობილური" required {...register('mobile')} error={!!errors.mobile} />
          <TextField placeholder="ჩაწერე ტელეფონი" label="ტელეფონი" {...register('phone')} error={!!errors.phone} />
        </div>
      </UpsertModal>
    </>
  );
};

export default UpsertUser;
