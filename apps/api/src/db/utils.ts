import { sql } from 'drizzle-orm';
import { uuid, timestamp } from 'drizzle-orm/pg-core';

export const timestampFields = {
  createdAt: timestamp('created_at', {
    withTimezone: false,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', {
    withTimezone: false,
  })
    .notNull()
    .defaultNow(),
};

export const idField = {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
};
