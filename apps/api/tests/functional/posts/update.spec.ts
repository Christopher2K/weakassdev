import { test } from '@japa/runner';
import Database from '@ioc:Adonis/Lucid/Database';

import { postsShowResponseSchema } from '@weakassdev/shared/validators';

import Post from 'App/Models/Post';
import User from 'App/Models/User';
import PostFactory from 'Database/factories/PostFactory';
import UserFactory from 'Database/factories/UserFactory';
import { DateTime } from 'luxon';

test.group('[posts update handler]', (group) => {
  let post: Post;
  let user: User;
  const postContent = 'Default post content';

  group.each.setup(async () => {
    await Database.beginGlobalTransaction();
    post = await PostFactory.with('author')
      .with('content', 1, (content) => content.merge({ content: postContent }))
      .create();
    await post.load('author');
    user = post.author;
    return () => Database.rollbackGlobalTransaction();
  });

  test('update a post that belongs to the current user', async ({ client, assert }) => {
    const response = await client
      .patch(`/v1/posts/${post.id}`)
      .json({
        content: 'New content!',
      })
      .loginAs(user)
      .accept('json');

    const body = postsShowResponseSchema.parse(response.body());
    response.assertStatus(200);
    assert.equal(body.content.content, 'New content!');
  });

  test('fails if the post is updated past the 30 minutes timeframe', async ({ client }) => {
    const now = DateTime.now().minus({ minutes: 40 }).toUTC();
    const oldPost = await PostFactory.with('author')
      .with('content')
      .merge({
        createdAt: now,
        updatedAt: now,
      })
      .create();

    const response = await client
      .patch(`/v1/posts/${oldPost.id}`)
      .json({
        content: 'New content!',
      })
      .loginAs(oldPost.author)
      .accept('json');

    response.assertStatus(403);
  }).skip(true, 'Fix that by using mock timers');

  test("does not update a post that doesn't belong to the current user", async ({ client }) => {
    const testUser = await UserFactory.create();
    const response = await client
      .patch(`/v1/posts/${post.id}`)
      .json({
        content: 'New content!',
      })
      .loginAs(testUser)
      .accept('json');

    response.assertStatus(403);
  });

  test('fails when the post does not exists', async ({ client }) => {
    const response = await client
      .patch(`/v1/posts/34d9068a-2e48-485f-a6d2-d59010564e60`)
      .json({
        content: 'New content!',
      })
      .loginAs(user)
      .accept('json');

    response.assertStatus(404);
  });

  test('fails when the new content is the same as the old one', async ({ client }) => {
    const response = await client
      .patch(`/v1/posts/${post.id}`)
      .json({
        content: postContent,
      })
      .loginAs(user)
      .accept('json');

    response.assertStatus(422);
  });
});
