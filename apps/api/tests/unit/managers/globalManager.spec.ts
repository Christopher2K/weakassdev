import { DateTime } from 'luxon';
import { test } from '@japa/runner';

import Database from '@ioc:Adonis/Lucid/Database';

import * as GlobalManager from 'App/Managers/GlobalManager';
import Post from 'App/Models/Post';
import User from 'App/Models/User';
import PostFactory from 'Database/factories/PostFactory';
import UserFactory from 'Database/factories/UserFactory';

test.group('[global manager tests]', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction();
    return () => Database.rollbackGlobalTransaction();
  });

  test('getEntitiesCurrentWeekCount() - returns how many posts were created this week', async ({
    assert,
  }) => {
    const now = DateTime.now().toUTC();
    const lastTuesday = now.set({ weekday: 2 });

    await Post.truncate(true);
    await PostFactory.with('author')
      .merge({
        createdAt: lastTuesday,
        updatedAt: lastTuesday,
      })
      .createMany(20);

    const count = await GlobalManager.getEntitiesCurrentWeekCount('Post');

    assert.equal(count['postCount'], 20);
  });

  test('getEntitiesCurrentWeekCount() - returns how many posts AND users were created this week', async ({
    assert,
  }) => {
    const now = DateTime.now().toUTC();
    const lastTuesday = now.set({ weekday: 2 });

    await User.truncate(true); // Delete all posts since cascade

    const users = await UserFactory.merge({
      createdAt: lastTuesday,
      updatedAt: lastTuesday,
    }).createMany(5);

    await PostFactory.merge({
      authorId: users.at(0)!.id,
      createdAt: lastTuesday,
      updatedAt: lastTuesday,
    }).createMany(20);

    const count = await GlobalManager.getEntitiesCurrentWeekCount('Post', 'User');

    assert.equal(count['postCount'], 20);
    assert.equal(count['userCount'], 5);
  });
});
