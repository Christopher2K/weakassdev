import { test } from '@japa/runner';
import Database from '@ioc:Adonis/Lucid/Database';

import User from 'App/Models/User';
import UserFactory from 'Database/factories/UserFactory';
import PostFactory from 'Database/factories/PostFactory';

test.group('[index handler]', (group) => {
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

  test('uses the Posts/Index template', async ({ client }) => {
    const response = await client.get('/admin/posts').inertia().loginAs(adminUser);
    response.assertInertiaTemplate('Admin/Posts/Index');
  });

  test('returns no posts', async ({ client, assert }) => {
    const response = await client.get('/admin/posts').inertia().loginAs(adminUser);
    assert.equal(response.inertiaProps().posts.data.length, 0);

    const paginatedResponse = await client.get('/admin/posts?page=4').inertia().loginAs(adminUser);
    assert.equal(paginatedResponse.inertiaProps().posts.data.length, 0);
  });

  test('returns available posts', async ({ client, assert }) => {
    await PostFactory.with('author').with('content').createMany(10);
    const response = await client.get('/admin/posts').inertia().loginAs(adminUser);
    assert.equal(response.inertiaProps().posts.data.length, 10);
  });

  test('returns a max of 30 posts at a time', async ({ client, assert }) => {
    await PostFactory.with('author').with('content').createMany(40);
    const response = await client.get('/admin/posts').inertia().loginAs(adminUser);
    assert.equal(response.inertiaProps().posts.data.length, 30);
  });
});

test.group('[show handler]', (group) => {
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

  test('returns the corresponding post', async ({ client, assert }) => {
    const post = await PostFactory.with('author').with('content').create();
    const response = await client.get(`/admin/posts/${post.id}`).inertia().loginAs(adminUser);

    assert.isDefined(response.inertiaProps().post);
  });

  test('404 if no post exists with this UUID', async ({ client }) => {
    const randomUUID = 'ecdcc9d8-b8ab-4aab-9f54-6e1cd25d7b5e';
    const response = await client.get(`/admin/posts/${randomUUID}`).inertia().loginAs(adminUser);
    response.assertStatus(404);
  });
});
