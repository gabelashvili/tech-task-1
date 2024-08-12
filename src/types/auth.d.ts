import { SignInSchema } from '@/schemas/auth';
import { z } from 'zod';
import { IPermission } from './role';

export type ISignIn = z.infer<typeof SignInSchema>;

export interface IRole {
  description: string;
  name: string;
  id: number;
  permissions: IPermission[];
}

export interface ISignInResponse {
  token: string;
  name: string;
  name_eng: string;
  lastName: string;
  lastName_eng: string;
  agency: string;
  position: string;
  email: string;
  mobile: string;
  phone: string;
  role: IRole;
}
