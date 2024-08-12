'use server';

import { ResponseModel } from '@/types/common';
import { fetcher } from './fetcher';
import { ErrorResponse } from '@/libs/error-response';
import { IUpsertUser, IUser } from '@/types/user';
import { revalidatePath } from 'next/cache';
import routes from '@/libs/routes';

export const getUsersAction = async (searchParams: { [key: string]: string }): Promise<ResponseModel<IUser[] | null>> => {
  try {
    const data = await fetcher<IUser[]>(`users?${new URLSearchParams(searchParams).toString()}`, {
      method: 'GET',
    });
    return { data, errorMessage: null };
  } catch (error) {
    return {
      errorMessage: (error as ErrorResponse).message,
      data: null,
    };
  }
};

export const getUserAction = async (id: string): Promise<ResponseModel<IUser | null>> => {
  try {
    const data = await fetcher<IUser[]>(`users/${id}`, {
      method: 'GET',
    });
    return { data: data[0], errorMessage: null };
  } catch (error) {
    return {
      errorMessage: (error as ErrorResponse).message,
      data: null,
    };
  }
};

export const addUserAction = async (data: IUpsertUser): Promise<ResponseModel<IUser[] | null>> => {
  try {
    await fetcher<IUser[]>(`users/add`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    revalidatePath(routes.users.fullUrl);
    return { data: null, errorMessage: null };
  } catch (error) {
    return {
      errorMessage: (error as ErrorResponse).message,
      data: null,
    };
  }
};

export const updateUserAction = async (data: IUpsertUser, userId: string): Promise<ResponseModel<IUser[] | null>> => {
  try {
    await fetcher<IUser[]>(`users/edit/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    revalidatePath(routes.users.fullUrl);
    return { data: null, errorMessage: null };
  } catch (error) {
    return {
      errorMessage: (error as ErrorResponse).message,
      data: null,
    };
  }
};

export const updateUserStatusAction = async (disabled: boolean, userId: string): Promise<ResponseModel<IUser[] | null>> => {
  try {
    await fetcher<IUser[]>(`users/edit/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ disabled }),
    });
    revalidatePath(routes.users.fullUrl);
    return { data: null, errorMessage: null };
  } catch (error) {
    return {
      errorMessage: (error as ErrorResponse).message,
      data: null,
    };
  }
};

export const updateUserAvatarAction = async (formData: FormData, userId: string): Promise<ResponseModel<IUser[] | null>> => {
  try {
    console.log(formData, 22);

    await fetcher<IUser[]>(
      `users/avatar/${userId}`,
      {
        method: 'PUT',
        body: formData,
      },
      'multipart/form-data',
    );
    revalidatePath(routes.users.fullUrl);
    return { data: null, errorMessage: null };
  } catch (error) {
    return {
      errorMessage: (error as ErrorResponse).message,
      data: null,
    };
  }
};
