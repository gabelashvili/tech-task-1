'use server';

import { ResponseModel } from '@/types/common';
import { fetcher } from './fetcher';
import { ErrorResponse } from '@/libs/error-response';

export const getAgenciesAction = async (): Promise<ResponseModel<any[] | null>> => {
  try {
    const data = await fetcher<any[]>(`agency`, {
      method: 'GET',
    });

    return { data, errorMessage: null };
  } catch (error) {
    console.log(error);

    return {
      errorMessage: (error as ErrorResponse).message,
      data: null,
    };
  }
};
