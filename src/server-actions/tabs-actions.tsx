'use server';

import { ResponseModel } from '@/types/common';
import { ITab, ITabLevel } from '@/types/tabs';
import { fetcher } from './fetcher';
import { ErrorResponse } from '@/libs/error-response';
import { z } from 'zod';
import { UpsertTabsSchema } from '@/schemas/tabs';
import { revalidatePath } from 'next/cache';
import routes from '@/libs/routes';

export const getTabLevelAction = async (): Promise<ResponseModel<ITabLevel[] | null>> => {
  try {
    const data = await fetcher<ITabLevel[]>('tab-level', {
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

export const getTabsAction = async (): Promise<ResponseModel<ITab[] | null>> => {
  try {
    const data = await fetcher<ITab[]>('tabs', {
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

export const addTabAction = async (data: z.infer<typeof UpsertTabsSchema>): Promise<ResponseModel<ITab[] | null>> => {
  try {
    await fetcher<ITab[]>('tabs/add', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    revalidatePath(routes.tabs.fullUrl);
    return { data: null, errorMessage: null };
  } catch (error) {
    return {
      errorMessage: (error as ErrorResponse).message,
      data: null,
    };
  }
};

export const editTabAction = async (data: z.infer<typeof UpsertTabsSchema>, id: number): Promise<ResponseModel<ITab[] | null>> => {
  try {
    await fetcher<ITab[]>(`tabs/edit/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    revalidatePath(routes.tabs.fullUrl);
    return { data: null, errorMessage: null };
  } catch (error) {
    return {
      errorMessage: (error as ErrorResponse).message,
      data: null,
    };
  }
};
