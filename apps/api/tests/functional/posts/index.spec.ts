import { test } from '@japa/runner';
import Database from '@ioc:Adonis/Lucid/Database';

import { postsIndexResponseSchema } from '@weakassdev/shared/validators';

import Post from 'App/Models/Post';
import PostFactory from 'Database/factories/PostFactory';

test.group('[posts index handler]', (group) => {
  group.setup(async () => {
    await Database.beginGlobalTransaction();
    await PostFactory.with('author').with('content').createMany(40);
    return () => Database.rollbackGlobalTransaction();
  });

  test('responds to anonymous users', async ({ client }) => {
    const response = await client.get('/v1/posts').accept('json');
    response.assertStatus(200);
  });

  test('pass the response data validator', async ({ client }) => {
    const response = await client.get('/v1/posts').accept('json');
    postsIndexResponseSchema.parse(response.body());
  });

  test('returns 30 items by default', async ({ client, assert }) => {
    const length = (await Post.all()).length;
    const response = await client.get('/v1/posts').accept('json');
    const data = postsIndexResponseSchema.parse(response.body());

    assert.equal(data.data.length, length > 30 ? 30 : length);
  });

  test('takes pagination qs', async ({ client, assert }) => {
    const response = await client.get('/v1/posts?page=2&limit=10').accept('json');
    const data = postsIndexResponseSchema.parse(response.body());

    assert.equal(data.data.length, 10);
    assert.equal(data.meta.currentPage, 2);
  });
});
