'use server';

import { ErrorResponse } from '@/libs/error-response';
import { cookies } from 'next/headers';

// eslint-disable-next-line no-undef
export const fetcher = async <T>(url: string, options?: RequestInit, contentType?: string): Promise<T> => {
  const request = await fetch(`https://tech-task-2.onrender.com/api/v1/${url}`, {
    ...options,
    headers: {
      'Content-Type': contentType || 'application/json',
      authorization: `Bearer ${cookies().get('jwt')?.value}`,
    },
  });

  const response = (await request.json()) as {
    data: any;
    errors: string[];
    message: string;
    statusCode: number;
  } as any;

  if (!response?.success) {
    throw new ErrorResponse('Something went wrong', response.statusCode);
  }
  return response.data;
};
