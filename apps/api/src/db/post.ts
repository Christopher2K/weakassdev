import { pgTable, uuid, text, pgEnum } from 'drizzle-orm/pg-core';

import { user } from './user';
import { idField, timestampFields } from './utils';

export const postStatus = pgEnum('PostStatus', ['PUBLISHED', 'ARCHIVED', 'FLAGGED', 'DELETED']);

export const post = pgTable('Post', {
  ...idField,
  ...timestampFields,
  content: text('content').notNull(),
  status: postStatus('status').notNull().default('PUBLISHED'),
  authorId: uuid('author_id')
    .references(() => user.id, {
      onDelete: 'restrict',
    })
    .notNull(),
});
