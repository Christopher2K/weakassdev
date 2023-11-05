import Database from '@ioc:Adonis/Lucid/Database';

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
