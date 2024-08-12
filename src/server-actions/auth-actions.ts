'use server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { fetcher } from './fetcher';
import { ISignIn, ISignInResponse } from '@/types/auth';
import { ErrorResponse } from '@/libs/error-response';
import moment from 'moment';
import { redirect } from 'next/navigation';
import { ResponseModel } from '@/types/common';

export const setAuthToken = (token: string) => {
  const decodedToken = jwtDecode(token) as { exp: number };
  const maxAgeInSeconds = moment.duration(moment.unix(decodedToken.exp).diff(moment(new Date()))).asSeconds();
  // set jwt token in cookie
  cookies().set({
    name: 'jwt',
    value: token,
    httpOnly: true,
    secure: true,
    maxAge: maxAgeInSeconds,
  });
};

export const signInUserAction = async (values: ISignIn): Promise<ResponseModel<ISignInResponse | null>> => {
  try {
    const data = await fetcher<ISignInResponse>('sign-in', {
      method: 'POST',
      body: JSON.stringify(values),
    });
    setAuthToken(data.token);
    revalidatePath('/');
    return { data, errorMessage: null };
  } catch (error) {
    return {
      errorMessage: (error as ErrorResponse).message,
      data: null,
    };
  }
};

export const getAuthedUserAction = async (): Promise<{ id: number; username: string; role: number } | null> => {
  const userString = cookies().get('jwt')?.value;
  if (userString) {
    try {
      const { id, role, username } = jwtDecode(userString!) as {
        id: number;
        username: string;
        role: number;
      };
      const user = { id, username, role };
      return { ...user };
    } catch (error) {
      return null;
    }
  }
  return null;
};
