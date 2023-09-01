import Database from '@ioc:Adonis/Lucid/Database';
import { test } from '@japa/runner';

import Post from 'App/Models/Post';
import PostFactory from 'Database/factories/PostFactory';

import { postsShowResponseSchema } from '@weakassdev/shared/validators';
import { postStatusSchema } from '@weakassdev/shared/models';

test.group('[posts show handler]', (group) => {
  let post: Post;

  group.each.setup(async () => {
    await Database.beginGlobalTransaction();
    post = await PostFactory.with('author').with('content').create();
    return () => Database.rollbackGlobalTransaction();
  });

  test('responds to anonymous user', async ({ client }) => {
    const response = await client.get(`/v1/posts/${post.id}`).accept('json');
    response.assertStatus(200);
  });

  test('pass the response data validator', async ({ client }) => {
    const response = await client.get(`/v1/posts/${post.id}`).accept('json');
    postsShowResponseSchema.parse(response.body());
    response.assertStatus(200);
  });

  test('fails if the parameter is not a valid uuid', async ({ client }) => {
    const response = await client.get(`/v1/posts/something-else`).accept('json');
    response.assertStatus(422);
  });

  test('fails if the id does not exists in database', async ({ client }) => {
    const response = await client
      .get(`/v1/posts/a65091c9-c884-487f-8a6d-34dadbb5aeba`)
      .accept('json');
    response.assertStatus(404);
  });

  test('not returns non-PUBLISHED posts')
    .with([
      postStatusSchema.Values.DELETED,
      postStatusSchema.Values.FLAGGED,
      postStatusSchema.Values.ARCHIVED,
    ])
    .run(async ({ client }, status) => {
      const newPost = await PostFactory.with('author')
        .merge({
          status,
        })
        .create();

      const response = await client.get(`/v1/posts/${newPost.id}`).accept('json');
      response.assertStatus(404);
    });
});
