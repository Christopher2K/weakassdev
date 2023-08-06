import { pgTable, pgEnum, uuid, text, unique } from 'drizzle-orm/pg-core';

import { idField, timestampFields } from './utils';
import { post } from './post';
import { user } from './user';

export const reportReason = pgEnum('ReportReason', ['OFFENSIVE', 'DUPLICATE']);
export const reportOutcome = pgEnum('ReportOutcome', ['APPROVED', 'REJECTED']);

export const postReport = pgTable(
  'PostReport',
  {
    ...idField,
    ...timestampFields,
    repoterId: uuid('reporter_id')
      .references(() => user.id, {
        onDelete: 'restrict',
      })
      .notNull(),
    postId: uuid('post_id')
      .references(() => post.id, {
        onDelete: 'restrict',
      })
      .notNull(),
    reason: reportReason('reason').notNull(),
    reasonContext: text('reason_context'),
    outcome: reportOutcome('outcome'),
    outcomeContext: text('outcome_context'),
  },
  (table) => ({
    uniqueReportPerUser: unique().on(table.postId, table.repoterId),
  }),
);
