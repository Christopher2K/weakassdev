import { z } from 'zod';

export const userRoleDbName = 'UserRole' as const;

export const userRoleSchema = z.enum(['ADMIN', 'USER']);
export type UserRole = z.infer<typeof userRoleSchema>;
