import { z } from 'zod';

export const postStatusDbName = 'PostStatus' as const;

export const postStatusSchema = z.enum(['PUBLISHED', 'ARCHIVED', 'FLAGGED', 'DELETED']);
export type PostStatus = z.infer<typeof postStatusSchema>;
