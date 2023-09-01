import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';

import UserFactory from 'Database/factories/UserFactory';

export default class UserSeeder extends BaseSeeder {
  static count = 30;

  public async run() {
    await UserFactory.createMany(UserSeeder.count);
  }
}
