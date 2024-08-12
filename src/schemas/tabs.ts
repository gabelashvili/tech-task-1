import { z } from 'zod';

export const UpsertTabsSchema = z.object({
  name: z.string().min(1),
  name_eng: z.string(),
  name_code: z.string().min(1),
  document_level_id: z.number().min(1),
});

export const UpsertArchiveSchema = z.object({
  name: z.string().min(1),
  name_eng: z.string(),
  name_code: z.string().min(1),
  document_level_id: z.number().min(1),
  validFrom: z.date(),
  validTo: z.date(),
  acceptDate: z.date(),
});
