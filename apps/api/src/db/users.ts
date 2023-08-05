import { sql } from 'drizzle-orm';
import { pgTable, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('uuid4')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
});
