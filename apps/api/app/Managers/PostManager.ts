import Database from '@ioc:Adonis/Lucid/Database';
import { postStatusSchema } from '@weakassdev/shared/models';
import Post from 'App/Models/Post';

/**
 * Get how many posts with active reports are currently pending an admin review
 */
export async function getReportedPostsCount(): Promise<number> {
  const request = await Database.from('Post')
    .count('*')
    .whereNot('status', 'FLAGGED')
    .andWhereExists(
      Database.from('PostReport').whereColumn('Post.id', 'PostReport.post_id').limit(1),
    );

  return +request.at(0).count;
}

/**
 * Set all published post as archived. Useful when a user is banned and we want to make
 * their posts inaccessible.
 */
export async function archiveAllUserPost({ userId }: { userId: string }) {
  return Post.query()
    .update({ status: postStatusSchema.Values.ARCHIVED })
    .where('status', postStatusSchema.Values.PUBLISHED)
    .andWhere('authorId', userId)
    .returning('*');
}

/**
 * Set all archived posts as published for a specific user
 */
export async function unarchiveAllUserPost({ userId }: { userId: string }) {
  return Post.query()
    .update({ status: postStatusSchema.Values.PUBLISHED })
    .where('status', postStatusSchema.Values.ARCHIVED)
    .andWhere('authorId', userId)
    .returning('*');
}
