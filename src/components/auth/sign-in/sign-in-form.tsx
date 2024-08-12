'use client';

import Button from '@/components/shared/button';
import CheckBox from '@/components/shared/checkbox';
import TextField from '@/components/shared/textfield';
import { SignInSchema } from '@/schemas/auth';
import { signInUserAction } from '@/server-actions/auth-actions';
import { ISignIn } from '@/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const SignInForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ISignIn>({ resolver: zodResolver(SignInSchema) });

  const onSubmit: SubmitHandler<ISignIn> = async (data) => {
    const { errorMessage } = await signInUserAction(data);
    if (errorMessage) {
      toast.error(errorMessage);
    } else {
      router.replace('/');
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <div className="space-y-6">
          <TextField
            error={!!errors.username}
            errorText={errors.username?.message}
            label="მომხმარებელი"
            placeholder="ელ.ფოსტა ან მობილური"
            {...register('username')}
          />
          <TextField
            error={!!errors.password}
            errorText={errors.password?.message}
            label="პაროლი"
            placeholder="პაროლი"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
          />
        </div>
        <CheckBox label="მაჩვენე პაროლი" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
      </div>
      <Button className="ml-auto flex" type="submit" loading={isSubmitting}>
        შესვლა
      </Button>
    </form>
  );
};

export default SignInForm;
