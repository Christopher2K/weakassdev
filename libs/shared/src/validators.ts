import { z } from 'zod';

import { postStatusSchema } from './models';
import { luxonDateTime } from './utils';

export const ZodError = z.ZodError;

export const listQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(30),
});

const listResponseSchema = z.object({
  meta: z.object({
    total: z.number(),
    perPage: z.number(),
    currentPage: z.number(),
    firstPage: z.number(),
    lastPage: z.number(),
  }),
});

export function makeListResponseSchema<T extends z.ZodTypeAny>(schema: T) {
  return listResponseSchema.merge(
    z.object({
      data: z.array(schema),
    }),
  );
}

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

export const postsIndexResponseSchema = makeListResponseSchema(
  z.object({
    id: z.string(),
    status: postStatusSchema,
    content: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    author: z.object({
      id: z.string(),
      username: z.string(),
      avatarUrl: z.string().url().nullish(),
    }),
  }),
);
export type PostsIndexResponse = z.infer<typeof postsIndexResponseSchema>;
