import { z } from 'zod';

export const UpsertUserSchema = z.object({
  name: z.string().min(1),
  name_eng: z.string(),
  lastName: z.string().min(1),
  lastName_eng: z.string(),
  idNumber: z.string().min(1),
  gender: z.union([z.literal('male'), z.literal('female')]),
  agency: z.number(),
  role: z.number().min(0),
  position: z.string().min(1),
  position_eng: z.string(),
  email: z.string().min(1).email(),
  mobile: z.string().min(1),
  phone: z.string(),
});
