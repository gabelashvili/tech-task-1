import { z } from 'zod';

export const UpsertRoleSchema = z.object({
  name: z.string().min(1, { message: 'ამ ველის შევსება სავალდებულოა' }),
  description: z.string(),
  permissions: z.object({
    users: z.array(z.number()),
    tabs: z.array(z.number()),
  }),
});
