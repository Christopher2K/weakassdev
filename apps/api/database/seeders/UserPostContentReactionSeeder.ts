import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';

import { generateRandomNumber, getUniqueRandomItemsFromArray } from 'App/Utils/seederUtils';
import Post from 'App/Models/Post';
import User from 'App/Models/User';
import UserPostContentReactionFactory from 'Database/factories/UserPostContentReactionFactory';

export default class UserPostContentReactionSeeder extends BaseSeeder {
  static maxReactionsPerPost = 10;

  public async run() {
    const posts = await Post.query().preload('content').select();
    const users = await User.all();

    for (let post of posts) {
      const numberOfReactions = generateRandomNumber({ min: 0, max: 10 });
      const usersWithoutPostAuthor = users.filter((user) => user.id !== post.authorId);
      const usersWithReaction = getUniqueRandomItemsFromArray({
        items: usersWithoutPostAuthor,
        count: numberOfReactions,
      });

      for (let user of usersWithReaction) {
        await UserPostContentReactionFactory.merge({
          userId: user.id,
          postContentId: post.content.id,
        }).create();
      }
    }
  }
}
