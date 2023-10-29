import { z } from 'zod';

import {
  postReportReasonSchema,
  postStatusSchema,
  userRoleSchema,
  userStatusSchema,
} from './models';
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

export const postsShowResponseSchema = z.object({
  id: z.string(),
  status: postStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  content: z.object({
    id: z.string(),
    content: z.string(),
    createdAt: z.string(),
  }),
  author: z.object({
    id: z.string(),
    username: z.string(),
    avatarUrl: z.string().url().nullish(),
  }),
});
export type PostsShowResponse = z.infer<typeof postsShowResponseSchema>;

export const postsIndexResponseSchema = makeListResponseSchema(postsShowResponseSchema);
export type PostsIndexResponse = z.infer<typeof postsIndexResponseSchema>;

export const entityShowParams = z.object({
  id: z.string().uuid(),
});

export const postsStoreRequestSchema = z.object({
  content: z.string().min(10),
});
export type PostsStoreRequest = z.infer<typeof postsStoreRequestSchema>;

export const postsReportRequestSchema = z.object({
  reason: postReportReasonSchema,
  reasonContext: z.string().nullish(),
});
export type PostsReportRequest = z.infer<typeof postsReportRequestSchema>;

export const postsReportResponseSchema = z.object({
  id: z.string(),
  reason: postReportReasonSchema,
  reasonContext: z.string().nullish(),
  postId: z.string(),
  reporterId: z.string(),
});
export type PostsReportResponse = z.infer<typeof postsStoreRequestSchema>;

export const adminUsersDataSchema = makeListResponseSchema(
  z.object({
    id: z.string(),
    username: z.string(),
    email: z.string().email(),
    status: userStatusSchema,
    role: userRoleSchema,
    createdAt: z.string(),
    avatarUrl: z.string().url().nullish(),
    biography: z.string().nullish(),
    externalLinks: z.object({
      value: z.array(z.record(z.string().url())),
    }),
  }),
);
export type AdminUsersData = z.infer<typeof adminUsersDataSchema>;

export const adminPostsDataSchema = makeListResponseSchema(
  z.object({
    id: z.string(),
    status: postStatusSchema,
    createdAt: z.string(),
    updatedAt: z.string(),
    content: z.object({
      id: z.string(),
      content: z.string(),
      createdAt: z.string(),
    }),
    author: z.object({
      id: z.string(),
      username: z.string(),
      avatarUrl: z.string().url().nullish(),
    }),
    revisions: z.number(),
  }),
);
export type AdminPostsData = z.infer<typeof adminPostsDataSchema>;

export const adminReportsDataSchema = makeListResponseSchema(
  z.object({
    id: z.string(),
    outcome: z.string().nullable(),
    outcomeContext: z.string().nullable(),
    post: z.object({
      id: z.string(),
      content: z.object({
        content: z.string(),
        createdAt: z.string(),
      }),
      author: z.object({
        id: z.string(),
        username: z.string(),
      }),
    }),
    reason: z.string(),
    reasonContext: z.string(),
    reporter: z.object({
      id: z.string(),
      username: z.string(),
    }),
    createdAt: z.string(),
  }),
);
export type AdminReportsData = z.infer<typeof adminReportsDataSchema>;
