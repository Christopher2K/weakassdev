import { z } from 'zod';

export const loginRequestSchema = z
  .object({
    username: z.string(),
    password: z.string(),
  })
  .required();

export const loginRequestResponse = z.object({});
