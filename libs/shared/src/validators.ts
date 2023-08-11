import { z } from 'zod';

import { luxonDateTime } from './utils';

export const ZodError = z.ZodError;

export const signupRequestSchema = z
  .object({
    username: z.string().min(2).max(20),
    password: z.string().min(8),
    email: z.string().email(),
  })
  .required();
export type SignupRequest = z.infer<typeof signupRequestSchema>;

export const loginRequestSchema = z
  .object({
    username: z.string(),
    password: z.string(),
  })
  .required();
export type LoginRequest = z.infer<typeof loginRequestSchema>;

export const authenticatedUserResponseSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  createdAt: luxonDateTime,
  avatarUrl: z.string().url().nullish(),
  biography: z.string().nullish(),
  externalLinks: z.object({
    value: z.array(z.record(z.string().url())),
  }),
});
export type AuthenticatedUserResponse = z.infer<typeof authenticatedUserResponseSchema>;
