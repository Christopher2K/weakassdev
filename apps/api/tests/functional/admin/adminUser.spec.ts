import { DateTime, Settings, Duration } from 'luxon';
import { test } from '@japa/runner';
import Database from '@ioc:Adonis/Lucid/Database';

import User from 'App/Models/User';
import UserFactory from 'Database/factories/UserFactory';

test.group('[index handler]', (group) => {
  const password = 'Password123';
  let adminUser: User;

  group.each.setup(async () => {
    await Database.beginGlobalTransaction();

    adminUser = await UserFactory.merge({
      password,
      role: 'ADMIN',
    }).create();

    Settings.now = () => Date.now();

    return () => Database.rollbackGlobalTransaction();
  });

  test('uses the Users/Index template', async ({ client }) => {
    const response = await client.get('/admin/users').inertia().loginAs(adminUser);
    response.assertInertiaTemplate('Admin/Users/Index');
  });

  test('returns no users', async ({ client }) => {
    const response = await client.get('/admin/users').inertia().loginAs(adminUser);
    response.assertInertiaPropsContains({ users: { data: [] } });

    const paginatedResponse = await client.get('/admin/users?page=4').inertia().loginAs(adminUser);
    paginatedResponse.assertInertiaPropsContains({ users: { data: [] } });
  });

  test('returns all users (max 30 per page)', async ({ assert, client }) => {
    await UserFactory.createMany(10);
    const response1 = await client.get('/admin/users').inertia().loginAs(adminUser);
    assert.equal(response1.inertiaProps().users.data.length, 11);

    await UserFactory.createMany(40);
    const response2 = await client.get('/admin/users').inertia().loginAs(adminUser);
    assert.equal(response2.inertiaProps().users.data.length, 30);
  });

  test('returns user accounts statistics', async ({ client }) => {
    const now = DateTime.utc(2023, 11, 9, 11, 0);
    Settings.now = () => now.toMillis();

    // Last month account
    await UserFactory.merge({
      createdAt: now.minus(Duration.fromObject({ day: 12 })),
      updatedAt: now.minus(Duration.fromObject({ day: 12 })),
    }).createMany(10);

    // This month account
    await UserFactory.merge({
      createdAt: now.minus(Duration.fromObject({ day: 8 })),
      updatedAt: now.minus(Duration.fromObject({ day: 8 })),
    }).createMany(5);

    // This week accounts
    await UserFactory.merge({
      createdAt: now.minus(Duration.fromObject({ day: 3 })),
      updatedAt: now.minus(Duration.fromObject({ day: 3 })),
    }).createMany(4);

    // Today accounts
    await UserFactory.merge({
      createdAt: now,
      updatedAt: now,
    }).createMany(3);

    const response = await client.get('/admin/users').inertia().loginAs(adminUser);
    response.assertInertiaPropsContains({
      entityCount: {
        today: 4, // the admin + 3
        week: 8, // today + 4
        month: 13, // Week + 5
      },
    });
  });
});

test.group('[show handler]', (group) => {
  const password = 'Password123';
  let adminUser: User;

  group.each.setup(async () => {
    await Database.beginGlobalTransaction();

    adminUser = await UserFactory.merge({
      password,
      role: 'ADMIN',
    }).create();

    Settings.now = () => Date.now();

    return () => Database.rollbackGlobalTransaction();
  });

  test('uses the Users/Show template', async ({ client }) => {
    const user = await UserFactory.create();

    const response = await client.get(`/admin/users/${user.id}`).inertia().loginAs(adminUser);
    response.assertInertiaTemplate('Admin/Users/Show');
  });

  test('404 if the user id does not exists', async ({ client }) => {
    const user = await UserFactory.create();
    const nonExistantUserId = user.id;
    await user.delete();

    const response = await client
      .get(`/admin/users/${nonExistantUserId}`)
      .inertia()
      .loginAs(adminUser);

    response.assertStatus(404);
  });
});
