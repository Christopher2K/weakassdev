import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';

import { generateRandomNumber, getUniqueRandomItemsFromArray } from 'App/Utils/seederUtils';
import User from 'App/Models/User';
import Post from 'App/Models/Post';
import PostReportFactory from 'Database/factories/PostReportFactory';

export default class PostReportSeeder extends BaseSeeder {
  static percentageOfPostsWithReports = 0.2;
  static maxReportPerPost = 10;

  public async run() {
    const posts = await Post.all();
    const users = await User.all();

    const numberOfPostsWithReports = Math.floor(
      posts.length * PostReportSeeder.percentageOfPostsWithReports,
    );
    const postsWithReports = getUniqueRandomItemsFromArray({
      items: posts,
      count: numberOfPostsWithReports,
    });

    for (let post of postsWithReports) {
      const numberOfReports = generateRandomNumber({
        min: 1,
        max: PostReportSeeder.maxReportPerPost,
      });

      const usersWithoutPostAuthor = users.filter((user) => user.id !== post.authorId);
      const reporters = getUniqueRandomItemsFromArray({
        items: usersWithoutPostAuthor,
        count: numberOfReports,
      });

      await PostReportFactory.merge(
        reporters.map((reporter) => ({
          postId: post.id,
          reporterId: reporter.id,
        })),
      ).createMany(reporters.length);
    }
  }
}
