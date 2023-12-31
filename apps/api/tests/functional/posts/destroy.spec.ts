import { test } from '@japa/runner';
import Database from '@ioc:Adonis/Lucid/Database';

import { postStatusSchema } from '@weakassdev/shared/models';

import Post from 'App/Models/Post';
import PostFactory from 'Database/factories/PostFactory';
import UserFactory from 'Database/factories/UserFactory';

test.group('[posts destroy handler]', (group) => {
  let post: Post;

  group.each.setup(async () => {
    await Database.beginGlobalTransaction();
    post = await PostFactory.with('author').create();
    return () => Database.rollbackGlobalTransaction();
  });

  test('mark a post as soft deleted', async ({ client, assert }) => {
    const response = await client
      .delete(`/v1/posts/${post.id}`)
      .loginAs(post.author)
      .accept('json');
    post = await post.refresh();

    response.assertStatus(202);
    assert.equal(post.status, postStatusSchema.Values.DELETED);
  });

  test('cannot delete a post that does not belongs to the current user', async ({ client }) => {
    const randomUser = await UserFactory.create();

    const response = await client
      .delete(`/v1/posts/${post.id}`)
      .loginAs(randomUser!)
      .accept('json');

    response.assertStatus(403);
  });

  test('cannot delete a post as an anonymous user', async ({ client }) => {
    const response = await client.delete(`/v1/posts/${post.id}`).accept('json');
    response.assertStatus(401);
  });

  test('cannot delete a post that is not in a PUBLISHED state', async ({ client }) => {
    await post
      .merge({
        status: postStatusSchema.Values.FLAGGED,
      })
      .save();

    const response = await client
      .delete(`/v1/posts/${post.id}`)
      .loginAs(post.author)
      .accept('json');

    response.assertStatus(403);
  });
});
