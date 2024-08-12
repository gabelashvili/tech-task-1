'use server';

import routes from '@/libs/routes';
import { fetcher } from './fetcher';
import { ErrorResponse } from '@/libs/error-response';
import { ResponseModel } from '@/types/common';
import { IRole, IUpsertRole } from '@/types/role';
import { revalidatePath } from 'next/cache';

export const getRolesActions = async (): Promise<ResponseModel<IRole[] | null>> => {
  try {
    const data = await fetcher<IRole[]>('role', {
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

export const getRoleActions = async (id: string): Promise<ResponseModel<IRole | null>> => {
  try {
    const data = await fetcher<IRole[]>(`role/${id}`, {
      method: 'GET',
    });
    return { data: data[0] || null, errorMessage: null };
  } catch (error) {
    return {
      errorMessage: (error as ErrorResponse).message,
      data: null,
    };
  }
};

export const addRoleActions = async (values: IUpsertRole): Promise<ResponseModel<null>> => {
  try {
    await fetcher<IRole[]>('role/add', {
      method: 'POST',
      body: JSON.stringify(values),
    });
    revalidatePath(routes.roles.fullUrl);
    return { data: null, errorMessage: null };
  } catch (error) {
    return {
      errorMessage: (error as ErrorResponse).message,
      data: null,
    };
  }
};

export const editRoleAction = async (values: IUpsertRole, id: string): Promise<ResponseModel<null>> => {
  try {
    await fetcher<IRole[]>(`role/edit/${id}`, {
      method: 'PUT',
      body: JSON.stringify(values),
    });
    revalidatePath(routes.roles.fullUrl);
    return { data: null, errorMessage: null };
  } catch (error) {
    return {
      errorMessage: (error as ErrorResponse).message,
      data: null,
    };
  }
};

export const removeRoleAction = async (id: string): Promise<ResponseModel<null>> => {
  try {
    await fetcher<IRole[]>(`role/edit/${id}`, {
      method: 'DELETE',
    });
    revalidatePath(routes.roles.fullUrl);
    return { data: null, errorMessage: null };
  } catch (error) {
    return {
      errorMessage: (error as ErrorResponse).message,
      data: null,
    };
  }
};
