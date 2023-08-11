import { z } from 'zod';

export const ZodError = z.ZodError;

export const signupRequestSchema = z
  .object({
    username: z.string().min(2).max(20),
    password: z.string().min(8),
    email: z.string().email(),
  })
  .required();
export type SignupRequest = z.infer<typeof signupRequestSchema>;

export const signupRequestResponse = z.object({});

export const loginRequestSchema = z
  .object({
    username: z.string(),
    password: z.string(),
  })
  .required();
export type LoginRequest = z.infer<typeof loginRequestSchema>;

export const loginRequestResponse = z.object({});
