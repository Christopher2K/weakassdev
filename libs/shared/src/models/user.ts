import { type InferModel } from 'drizzle-orm';
import { pgTable, pgEnum, varchar, text, jsonb } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import type {} from 'zod';

import { idField, timestampFields } from './utils';

export const userRole = pgEnum('UserRole', ['ADMIN', 'USER']);

export const userStatus = pgEnum('UserStatus', ['BANNED', 'DELETED', 'ACTIVE']);

export const user = pgTable('User', {
  ...idField,
  ...timestampFields,
  username: varchar('username', {
    length: 20,
  })
    .unique()
    .notNull(),
  password: varchar('password'),
  email: varchar('email').unique().notNull(),
  avatarUrl: varchar('avatar_url'),
  biography: text('biography'),
  externalLinks: jsonb('external_links')
    .$type<Array<{ [key: string]: string }>>()
    .default([])
    .notNull(),
  role: userRole('role').default('USER').notNull(),
  status: userStatus('status').default('ACTIVE').notNull(),
});

export const insertUserSchema = createInsertSchema(user, {
  email: () => z.string().email(),
});
export const selectUserSchema = createSelectSchema(user);

export type User = InferModel<typeof user>;
export type UserRole = User['role'];
export type UserStatus = User['status'];

export type NewUser = InferModel<typeof user, 'insert'>;
