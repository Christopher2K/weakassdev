import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';

import UserFactory from 'Database/factories/UserFactory';

const COUNT = 20;

export default class extends BaseSeeder {
  public async run() {
    for (let i = 0; i < COUNT; i++) {
      await UserFactory.with('posts', Math.floor(Math.random() * 15) + 1).create();
    }
  }
}
