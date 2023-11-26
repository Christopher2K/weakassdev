import { DateTime, Settings, Duration } from 'luxon';
import { test } from '@japa/runner';
import Database from '@ioc:Adonis/Lucid/Database';

import User from 'App/Models/User';
import UserFactory from 'Database/factories/UserFactory';
import PostFactory from 'Database/factories/PostFactory';
import { postStatusSchema, userStatusSchema } from '@weakassdev/shared/models';
import Post from 'App/Models/Post';

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

  test('returns no users', async ({ client, assert }) => {
    const response = await client.get('/admin/users').inertia().loginAs(adminUser);
    assert.equal(response.inertiaProps().users.data.length, 1); // 1 for admin

    const paginatedResponse = await client.get('/admin/users?page=4').inertia().loginAs(adminUser);
    assert.equal(paginatedResponse.inertiaProps().users.data.length, 0);
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

  test('returns the corresponding user', async ({ client }) => {
    const user = await UserFactory.create();
    const response = await client.get(`/admin/users/${user.id}`).inertia().loginAs(adminUser);

    response.assertInertiaPropsContains({ user: { id: user.id } });
  });

  test('returns posts associated to the user', async ({ client, assert }) => {
    const user = await UserFactory.create();
    await PostFactory.merge({ authorId: user.id }).with('content').createMany(3);

    const response = await client.get(`/admin/users/${user.id}`).inertia().loginAs(adminUser);

    response.assertInertiaPropsContains({ posts: { data: [] } });
    assert.equal(response.inertiaProps().posts.data.length, 3);
  });

  test('paginates the posts associated to the user', async ({ client, assert }) => {
    const user = await UserFactory.create();
    await PostFactory.merge({ authorId: user.id }).with('content').createMany(11);

    const response1 = await client.get(`/admin/users/${user.id}`).inertia().loginAs(adminUser);
    assert.equal(response1.inertiaProps().posts.data.length, 10);

    const response2 = await client
      .get(`/admin/users/${user.id}?postsPage=2`)
      .inertia()
      .loginAs(adminUser);
    assert.equal(response2.inertiaProps().posts.data.length, 1);

    const response3 = await client
      .get(`/admin/users/${user.id}?postsPage=3`)
      .inertia()
      .loginAs(adminUser);
    assert.equal(response3.inertiaProps().posts.data.length, 0);
  });
});

test.group('[archive handler]', (group) => {
  let adminUser: User;
  const password = 'Password123';

  group.each.setup(async () => {
    await Database.beginGlobalTransaction();

    adminUser = await UserFactory.merge({
      password,
      role: 'ADMIN',
    }).create();

    return () => Database.rollbackGlobalTransaction();
  });

  test('archive an active user and redirects to prev page', async ({ client, assert }) => {
    const user = await UserFactory.create();
    const response = await client
      .patch(`/admin/users/${user.id}/archive`)
      .inertia()
      .headers({
        referrer: `/admin/users/${user.id}`,
      })
      .loginAs(adminUser);
    await user.refresh();

    response.assertStatus(200);
    assert.equal(user.status, userStatusSchema.Values.DELETED);
  });

  test('cannot archive a non existant user', async ({ client }) => {
    const uuid = 'ecdcc9d8-b8ab-4aab-9f54-6e1cd25d7b5e';
    const response = await client
      .patch(`/admin/users/${uuid}/archive`)
      .inertia()
      .redirects(0)
      .loginAs(adminUser);

    response.assertStatus(404);
  });

  test('cannot archive a banner user', async ({ client, assert }) => {
    const user = await UserFactory.merge({ status: userStatusSchema.Values.BANNED }).create();

    const response = await client
      .patch(`/admin/users/${user.id}/archive`)
      .redirects(0)
      .inertia()
      .loginAs(adminUser);

    assert.notEqual(user.status, userStatusSchema.Values.DELETED);
    response.assertStatus(303);
    response.assertFlashMessage('feedback', ['error', 'Cet utilisateur ne peut pas être archivé.']);
  });

  test('cannot archive the current current admin logged in', async ({ client }) => {
    const response = await client
      .patch(`/admin/users/${adminUser.id}/archive`)
      .redirects(0)
      .inertia()
      .loginAs(adminUser);

    response.assertFlashMessage('feedback', [
      'error',
      "Impossible d'archiver l'utilisateur courant.",
    ]);
  });
});

test.group('[unarchive handler]', (group) => {
  let adminUser: User;
  const password = 'Password123';

  group.each.setup(async () => {
    await Database.beginGlobalTransaction();

    adminUser = await UserFactory.merge({
      password,
      role: 'ADMIN',
    }).create();

    return () => Database.rollbackGlobalTransaction();
  });

  test('restore a archived user and redirects to prev page', async ({ client, assert }) => {
    const user = await UserFactory.merge({ status: userStatusSchema.Values.DELETED }).create();

    const response = await client
      .patch(`/admin/users/${user.id}/restore`)
      .inertia()
      .headers({
        referrer: `/admin/users/${user.id}`,
      })
      .loginAs(adminUser);
    await user.refresh();

    response.assertStatus(200);
    assert.equal(user.status, userStatusSchema.Values.ACTIVE);
  });

  test('cannot restore a non existant user', async ({ client }) => {
    const uuid = 'ecdcc9d8-b8ab-4aab-9f54-6e1cd25d7b5e';
    const response = await client
      .patch(`/admin/users/${uuid}/restore`)
      .inertia()
      .redirects(0)
      .loginAs(adminUser);

    response.assertStatus(404);
  });

  test('cannot restore an active user', async ({ client, assert }) => {
    const user = await UserFactory.merge({ status: userStatusSchema.Values.ACTIVE }).create();

    const response = await client
      .patch(`/admin/users/${user.id}/restore`)
      .redirects(0)
      .inertia()
      .loginAs(adminUser);

    assert.equal(user.status, userStatusSchema.Values.ACTIVE);
    response.assertStatus(303);
    response.assertFlashMessage('feedback', [
      'error',
      'Ce compte utilisateur ne peut pas pas être restoré.',
    ]);
  });

  test('cannot restore a banned user', async ({ client, assert }) => {
    const user = await UserFactory.merge({ status: userStatusSchema.Values.BANNED }).create();

    const response = await client
      .patch(`/admin/users/${user.id}/restore`)
      .redirects(0)
      .inertia()
      .loginAs(adminUser);

    assert.equal(user.status, userStatusSchema.Values.BANNED);
    response.assertStatus(303);
    response.assertFlashMessage('feedback', [
      'error',
      'Ce compte utilisateur ne peut pas pas être restoré.',
    ]);
  });
});

// test.group('[ban handler]', (group) => {
//   let adminUser: User;
//   const password = 'Password123';
//
//   group.each.setup(async () => {
//     await Database.beginGlobalTransaction();
//
//     adminUser = await UserFactory.merge({
//       password,
//       role: 'ADMIN',
//     }).create();
//
//     return () => Database.rollbackGlobalTransaction();
//   });
// });

test.group('[ban handler]', (group) => {
  let adminUser: User;
  const password = 'Password123';

  group.each.setup(async () => {
    await Database.beginGlobalTransaction();

    adminUser = await UserFactory.merge({
      password,
      role: 'ADMIN',
    }).create();

    return () => Database.rollbackGlobalTransaction();
  });

  test('ban an active user, archive their posts, and redirects to prev page', async ({
    client,
    assert,
  }) => {
    const user = await UserFactory.create();
    await PostFactory.merge({
      authorId: user.id,
      status: postStatusSchema.Values.PUBLISHED,
    })
      .with('content')
      .createMany(10);

    const response = await client
      .patch(`/admin/users/${user.id}/ban`)
      .inertia()
      .headers({
        referrer: `/admin/users/${user.id}`,
      })
      .loginAs(adminUser);
    await user.refresh();

    const updatedPosts = await Post.query().where('authorId', user.id);
    const allPostsAreArchived = updatedPosts.every(
      (p) => p.status === postStatusSchema.Values.ARCHIVED,
    );

    response.assertStatus(200);
    assert.equal(user.status, userStatusSchema.Values.BANNED);
    assert.isTrue(allPostsAreArchived);
  });

  test('cannot ban an archived user', async ({ client, assert }) => {
    const user = await UserFactory.merge({ status: userStatusSchema.Values.DELETED }).create();

    const response = await client
      .patch(`/admin/users/${user.id}/ban`)
      .redirects(0)
      .inertia()
      .loginAs(adminUser);

    assert.notEqual(user.status, userStatusSchema.Values.BANNED);
    response.assertStatus(303);
    response.assertFlashMessage('feedback', [
      'error',
      'Ce compte utilisateur ne peut pas être banni.',
    ]);
  });

  test('cannot ban the current admin logged in', async ({ client }) => {
    const response = await client
      .patch(`/admin/users/${adminUser.id}/ban`)
      .redirects(0)
      .inertia()
      .loginAs(adminUser);

    response.assertFlashMessage('feedback', [
      'error',
      "Impossible de bannir l'utilisateur courant.",
    ]);
  });
});
