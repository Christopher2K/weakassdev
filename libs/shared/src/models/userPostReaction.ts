import { pgTable, varchar, uuid, primaryKey } from 'drizzle-orm/pg-core';

import { timestampFields } from './utils';
import { user } from './user';
import { post } from './post';

export const userPostReaction = pgTable(
  'UserPostReaction',
  {
    postId: uuid('post_id')
      .references(() => post.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    userId: uuid('user_id')
      .references(() => user.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    reaction: varchar('reaction', {
      length: 20,
    }).notNull(),
    ...timestampFields,
  },
  (table) => ({
    pk: primaryKey(table.postId, table.userId),
  }),
);
