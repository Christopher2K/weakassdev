import { test } from '@japa/runner';
import Database from '@ioc:Adonis/Lucid/Database';

import { postsReportResponseSchema } from '@weakassdev/shared/validators';

import Post from 'App/Models/Post';
import PostFactory from 'Database/factories/PostFactory';
import UserFactory from 'Database/factories/UserFactory';
import PostReportFactory from 'Database/factories/PostReportFactory';

test.group('[posts report handler]', (group) => {
  let post: Post;

  group.each.setup(async () => {
    await Database.beginGlobalTransaction();
    post = await PostFactory.with('author').create();
    return () => Database.rollbackGlobalTransaction();
  });

  test('report a post created by another user', async ({ client }) => {
    const anotherUser = await UserFactory.create();
    const response = await client
      .post(`/v1/posts/${post.id}/report`)
      .json({
        reason: 'DUPLICATE',
        reasonContext: 'Test',
      })
      .loginAs(anotherUser)
      .accept('json');

    postsReportResponseSchema.parse(response.body());
    response.assertStatus(200);
  });

  test('fails when the post belongs to the current user', async ({ client }) => {
    const response = await client
      .post(`/v1/posts/${post.id}/report`)
      .json({
        reason: 'DUPLICATE',
        reasonContext: 'Test',
      })
      .loginAs(post.author)
      .accept('json');

    response.assertStatus(403);
  });

  test('fails when the current user already reported this post', async ({ client }) => {
    const postReport = await PostReportFactory.with('reporter')
      .with('post', 1, (post) => post.with('author'))
      .create();

    const response = await client
      .post(`/v1/posts/${postReport.postId}/report`)
      .json({
        reason: 'DUPLICATE',
        reasonContext: 'Test',
      })
      .loginAs(postReport.reporter)
      .accept('json');

    response.assertStatus(422);
  });

  test('fails when the post does not exist', async ({ client }) => {
    const user = await UserFactory.create();

    const response = await client
      .post(`/v1/posts/7d35cc5e-fceb-461b-b4f3-0afd6a40e4df/report`)
      .json({
        reason: 'DUPLICATE',
        reasonContext: 'Test',
      })
      .loginAs(user)
      .accept('json');

    response.assertStatus(404);
  });

  test('fails when the user is not authenticated', async ({ client }) => {
    const response = await client
      .post(`/v1/posts/7d35cc5e-fceb-461b-b4f3-0afd6a40e4df/report`)
      .json({
        reason: 'DUPLICATE',
        reasonContext: 'Test',
      })
      .accept('json');

    response.assertStatus(401);
  });
});
