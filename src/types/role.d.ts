import { UpsertRoleSchema } from '@/schemas/roles';
import { z } from 'zod';

export enum PermissionsEnum {
  add,
  update,
  delete,
  'read only',
}

export type IRoleKey = 'add' | 'delete' | 'update' | 'read only';

export type IPermission = {
  users?: { id: number; name: string; key: IRoleKey }[];
  tabs?: { id: number; name: string; key: IRoleKey }[];
};

export interface IRole {
  id: number;
  name: string;
  description: string;
  permissions: IPermission;
  totalUsers: number;
}

export type IUpsertRole = z.infer<typeof UpsertRoleSchema>;
