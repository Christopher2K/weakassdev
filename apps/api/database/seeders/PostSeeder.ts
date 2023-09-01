import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';

import { generateRandomNumber, getUniqueRandomItemsFromArray } from 'App/Utils/seederUtils';
import User from 'App/Models/User';
import PostFactory from 'Database/factories/PostFactory';

export default class PostSeeder extends BaseSeeder {
  static percentOfUsersWithPosts = 0.8;
  static maxPostPerUser = 5;
  static maxContentPerPost = 3;

  public async run() {
    const users = await User.all();
    const numberOfUsersWithPosts = users.length * PostSeeder.percentOfUsersWithPosts;
    const usersWithPosts = getUniqueRandomItemsFromArray({
      items: users,
      count: numberOfUsersWithPosts,
    });

    for (let user of usersWithPosts) {
      const numberOfPost = generateRandomNumber({ min: 1, max: PostSeeder.maxPostPerUser });

      for (let i = 0; i < numberOfPost; i++) {
        const numberOfPostContent = generateRandomNumber({
          min: 1,
          max: PostSeeder.maxContentPerPost,
        });

        await PostFactory.merge({
          authorId: user.id,
        })
          .with('postVersions', numberOfPostContent)
          .create();
      }
    }
  }
}
