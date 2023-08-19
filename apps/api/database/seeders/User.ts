import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';

import UserFactory from 'Database/factories/UserFactory';

const COUNT = 100;

export default class extends BaseSeeder {
  public async run() {
    for (let i = 0; i < COUNT; i++) {
      await UserFactory.with('posts', Math.floor(Math.random() * 5), (post) =>
        post.with('postVersions', Math.floor(Math.random() * 2) + 1, (content) =>
          content.with('reactions', Math.floor(Math.random() * 5), (reaction) =>
            reaction.with('user'),
          ),
        ),
      ).create();
    }
  }
}
