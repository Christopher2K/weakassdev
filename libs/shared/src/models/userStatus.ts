import { z } from 'zod';

export const userStatusDbName = 'UserStatus' as const;

export const userStatusSchema = z.enum(['BANNED', 'DELETED', 'ACTIVE']);
export type UserStatus = z.infer<typeof userStatusSchema>;
