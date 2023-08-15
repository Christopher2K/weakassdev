import Database from '@ioc:Adonis/Lucid/Database';
import { test } from '@japa/runner';

import User from 'App/Models/User';
import UserFactory from 'Database/factories/UserFactory';

import { postsShowResponseSchema } from '@weakassdev/shared/validators';

test.group('[posts store handler]', (group) => {
  let user: User;
  const password = 'Password123';

  group.each.setup(async () => {
    await Database.beginGlobalTransaction();
    user = await UserFactory.merge({
      password,
    }).create();
    return () => Database.rollbackGlobalTransaction();
  });

  test('create a post and returns it', async ({ client }) => {
    const response = await client
      .post(`/v1/posts`)
      .json({ content: 'Hello, how are you?' })
      .loginAs(user);

    response.assertStatus(200);
  });

  test('pass the response data validator', async ({ client }) => {
    const response = await client
      .post(`/v1/posts`)
      .json({ content: 'Hello, how are you?' })
      .loginAs(user);

    response.assertStatus(200);
    postsShowResponseSchema.parse(response.body());
  });

  test('rejects anonymous user', async ({ client }) => {
    const response = await client.post(`/v1/posts`);
    response.assertStatus(401);
  });

  test('rejects invalid input', async ({ client }) => {
    const response = await client
      .post(`/v1/posts`)
      .json({ text: 'Hello, how are you?' })
      .loginAs(user);

    response.assertStatus(422);
  });
});
