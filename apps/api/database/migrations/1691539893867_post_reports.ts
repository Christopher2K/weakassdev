import BaseSchema from '@ioc:Adonis/Lucid/Schema';

import {
  postReportReasonSchema,
  postReportReasonDbName,
  postReportOutcomeDbName,
  postReportOutcomeSchema,
} from '@weakassdev/shared/models';

export default class extends BaseSchema {
  protected tableName = 'PostReport';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('gen_random_uuid()'));
      table
        .enum(
          'reason',
          [postReportReasonSchema.Values.OFFENSIVE, postReportReasonSchema.Values.DUPLICATE],
          {
            useNative: true,
            existingType: false,
            enumName: postReportReasonDbName,
          },
        )
        .notNullable();
      table.text('reason_context').nullable();

      table
        .enum(
          'outcome',
          [postReportOutcomeSchema.Values.APPROVED, postReportOutcomeSchema.Values.REJECTED],
          {
            useNative: true,
            existingType: false,
            enumName: postReportOutcomeDbName,
          },
        )
        .notNullable();
      table.text('outcome_context').nullable();
      table.uuid('post_id').references('Post.id').onDelete('RESTRICT').notNullable();
      table.uuid('reporter_id').references('User.id').onDelete('RESTRICT').notNullable();

      table.unique(['post_id', 'reporter_id'], {
        useConstraint: true,
      });

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
    this.schema.raw(`DROP TYPE "${postReportOutcomeDbName}";`);
    this.schema.raw(`DROP TYPE "${postReportReasonDbName}";`);
  }
}
