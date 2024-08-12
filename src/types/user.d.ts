import { z } from 'zod';
import { IRole } from './role';
import { UpsertUserSchema } from '@/schemas/users';

export type Gender = 'male' | 'female';
export interface IUser {
  name: string;
  name_eng: string;
  lastName: string;
  lastName_eng: string;
  agency: { id: number; name: string };
  position: string;
  email: string;
  mobile: string;
  phone: string;
  role: IRole;
  createdAt: Date;
  updatedAt: Date;
  id: number;
  file?: string;
  disabled?: boolean;
  position_eng?: string;
  gender?: Gender;
  idNumber?: string;
}

export type IUpsertUser = z.infer<typeof UpsertUserSchema>;
