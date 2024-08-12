'use client';

import { FC, useEffect, useState } from 'react';
import UpsertModal from '../shared/upsert-modal';
import TextField from '../shared/textfield';
import Select from 'react-select';
import { ITab, ITabLevel } from '@/types/tabs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpsertTabsSchema } from '@/schemas/tabs';
import { z } from 'zod';
import { addTabAction, editTabAction } from '@/server-actions/tabs-actions';
import SuccessDialog from '../shared/success-dialog';

interface UpsertTabModalProps {
  open: boolean;
  closeModal: () => void;
  levels: ITabLevel[];
  editItem?: ITab;
}

const UpsertTabModal: FC<UpsertTabModalProps> = ({ closeModal, open, levels, editItem }) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
    watch,
    reset,
    setValue,
  } = useForm<z.infer<typeof UpsertTabsSchema>>({
    resolver: zodResolver(UpsertTabsSchema),
  });

  const selectedLevel = () => {
    const level = levels?.find((el) => el.id === watch('document_level_id'));
    if (level) {
      return { value: level.id, label: level.name };
    }
    return null;
  };

  const onSubmit = handleSubmit(async (data) => {
    const { errorMessage } = editItem ? await editTabAction(data, editItem.id) : await addTabAction(data);
    if (!errorMessage) {
      setShowSuccess(true);
      closeModal();
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
        document_level_id: editItem.document_level_id,
        name: editItem.name,
        name_code: editItem.name_code,
        name_eng: editItem.name_eng,
      });
    }
  }, [editItem]);

  return (
    <>
      <SuccessDialog open={showSuccess} closeModal={() => setShowSuccess(false)} />
      <UpsertModal
        title={editItem ? 'ჩანართის რედაქტირება' : "ჩანართის შექმნა"}
        closeModal={closeModal}
        onCancel={closeModal}
        onOk={onSubmit}
        okPending={isSubmitting}
        open={open}
        className="w-full max-w-lg"
        okLabel={editItem ? 'შენახვა' : 'დამატება'}
      >
        <div className="flex max-h-[60vh] w-full grid-cols-2 flex-col gap-6 overflow-auto p-0.5">
          <TextField required placeholder="ჩაწერეთ Namecode" label="NAMECODE" {...register('name_code')} error={!!errors.name_code} />
          <TextField required placeholder="ჩაწერეთ დასახელება" label="დასახელება (ქარ)" {...register('name')} error={!!errors.name} />
          <TextField placeholder="ჩაწერეთ დასახელება" label="დასახელება (ENG)" {...register('name_eng')} />
          <div className="space-y-1.5">
            <p className="text-sm">
              დოკუმენტის დონე
              <span className="ml-1 text-red-700">*</span>
            </p>
            <Select
              menuPosition="fixed"
              styles={{
                control: (base) => ({
                  ...base,
                  height: 52,
                  minHeight: 52,
                  borderRadius: 8,
                  borderColor: errors.document_level_id && 'red !important',
                  outline: errors.document_level_id && 'none !important',
                  boxShadow: errors.document_level_id && 'none !important',
                }),
              }}
              placeholder={'აირჩიეთ დონე'}
              options={levels.map((el) => ({ label: el.name, value: el.id }))}
              value={selectedLevel()}
              onChange={(newVal) => {
                if (newVal) {
                  setValue('document_level_id', newVal.value, { shouldValidate: isSubmitted });
                }
              }}
            />
          </div>
        </div>
      </UpsertModal>
    </>
  );
};

export default UpsertTabModal;
