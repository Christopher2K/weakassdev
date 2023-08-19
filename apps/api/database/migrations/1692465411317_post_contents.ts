import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'PostContent';

  public async up() {
    // STEP1: Create the new PostContent table
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('gen_random_uuid()'));
      table.text('content').notNullable();
      table.uuid('post_id').references('Post.id').onDelete('RESTRICT').notNullable();

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: false });
      table.timestamp('updated_at', { useTz: false });
    });

    // STEP2: On add a the new relation columns on the reaction table
    this.schema.alterTable('UserPostReaction', (table) => {
      table
        .uuid('post_content_id')
        .references('PostContent.id')
        .onDelete('RESTRICT')
        .defaultTo(null);
    });

    // STEP3: Migrate the existing content to the new table
    this.defer(async function migrateData(db) {
      // STEP3.1: Get the post ids and its content
      let data: Array<{
        post_id: string;
        content: string;
      }> = await db.from('Post').select('Post.id as post_id', 'Post.content as content');

      // STEP3.2: Create a new PostContent entry for each existing post
      if (data.length === 0) return;
      const postContentIds = (await db
        .table('PostContent')
        .returning(['id', 'post_id'])
        .multiInsert(
          data.map(({ content, post_id }) => {
            return {
              content,
              post_id,
            };
          }),
        )) as Array<{ id: string; post_id: string }>;

      // STEP3.3: Change the user reaction to referencing the Content and not the post itself
      await Promise.all(
        postContentIds.map(({ id: post_content_id, post_id }) => {
          return db
            .from('UserPostReaction')
            .update({
              post_content_id,
            })
            .where('post_id', post_id);
        }),
      );
    });

    // STEP4: Remove legacy content column on `Post`
    this.schema.alterTable('Post', (table) => {
      table.dropColumn('content');
    });

    // STEP5: Remove legacy columns and constraint on UserPostReaction table
    this.schema.alterTable('UserPostReaction', (table) => {
      table.dropColumn('post_id');
      table.unique(['post_content_id', 'user_id'], {
        useConstraint: true,
      });
      // Add the not null constraint to the new relation column
      table.dropNullable('post_content_id');
    });

    // STEP6: Rename the column to match the current schema
    this.schema.renameTable('UserPostReaction', 'UserPostContentReaction');
  }

  public async down() {
    // STEP1: Restore the content column on Post
    this.schema.alterTable('Post', (table) => {
      table.text('content').notNullable().defaultTo('TEMPORARY_VALUE');
    });

    // STEP2: Restore the post_id relation on UserPostContentReaction
    this.schema.alterTable('UserPostContentReaction', (table) => {
      table.uuid('post_id').references('Post.id').onDelete('RESTRICT').defaultTo(null);
    });

    // STEP3: Migrate data
    this.defer(async (db) => {
      // STEP3.1: Get the latest content available for every posts
      const query = (await db
        .from('Post')
        .distinctOn('PostContent.post_id')
        .select('Post.id as post_id', 'PostContent.content as content')
        .leftJoin('PostContent', 'Post.id', 'PostContent.post_id')
        .orderBy([
          { column: 'PostContent.post_id', order: 'desc' },
          { column: 'PostContent.created_at', order: 'desc' },
        ])
        .exec()) as Array<{ post_id: string; content: string }>;

      // STEP3.2: Put that content back to the Post table
      await Promise.all(
        query.map(({ content, post_id }) => {
          return db
            .from('Post')
            .update({
              content,
            })
            .where('id', post_id);
        }),
      );

      // STEP3.3 Link the reactions back to the Post table
      const reactions = (await db
        .from('UserPostContentReaction')
        .select('UserPostContentReaction.id as reaction_id', 'PostContent.post_id as post_id')
        .leftJoin('PostContent', 'UserPostContentReaction.post_content_id', 'PostContent.id')
        .exec()) as Array<{ reaction_id: string; post_id: string }>;

      await Promise.all(
        reactions.map(({ reaction_id, post_id }) => {
          return db
            .from('UserPostContentReaction')
            .update({
              post_id,
            })
            .where('id', reaction_id);
        }),
      );
    });

    // STEP4 Remove the relation between Content and Reactions
    this.schema.alterTable('UserPostContentReaction', (table) => {
      table.dropColumn('post_content_id');
      table.unique(['post_id', 'user_id'], {
        useConstraint: true,
      });
      // Add back the not null constraint
      table.dropNullable('post_id');
    });

    // STEP5 Rename the reaction table for consistency
    this.schema.renameTable('UserPostContentReaction', 'UserPostReaction');

    // STEP6 Drop the content table
    this.schema.dropTable(this.tableName);
  }
}
