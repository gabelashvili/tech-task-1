import { z } from 'zod';

export const SignInSchema = z.object({
  username: z.string().min(1, { message: 'ამ ველის შევსება სავალდებულოა' }),
  password: z.string().min(1, { message: 'ამ ველის შევსება სავალდებულოა' }),
});
