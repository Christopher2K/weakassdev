import { test } from '@japa/runner';
import Database from '@ioc:Adonis/Lucid/Database';

import UserFactory from 'Database/factories/UserFactory';
import User from 'App/Models/User';

test.group('[login handler]', (group) => {
  const password = 'Password123';
  let user: User;

  group.each.setup(async () => {
    await Database.beginGlobalTransaction();

    user = await UserFactory.merge({
      password,
    }).create();

    return () => Database.rollbackGlobalTransaction();
  });

  test('logs an user with their username and password', async ({ client }) => {
    const response = await client
      .post('/v1/auth/login')
      .json({
        username: user.username,
        password: password,
      })
      .accept('json');

    response.assertStatus(200);
    response.assertBody({
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt.toUTC().toISO(),
        avatarUrl: null,
        biography: null,
        externalLinks: {
          value: [],
        },
      },
    });
  });

  test('does not log an user with an incorrect username', async ({ client }) => {
    const response = await client
      .post('/v1/auth/login')
      .json({
        username: 'bad_username',
        password: password,
      })
      .accept('json');

    response.assertStatus(400);
  });

  test('does not log an user with an incorrect password', async ({ client }) => {
    const response = await client
      .post('/v1/auth/login')
      .json({
        username: user.username,
        password: 'bad_password',
      })
      .accept('json');

    response.assertStatus(400);
  });

  test('rejects the request if the payload is unexpected', async ({ client }) => {
    const response = await client
      .post('/v1/auth/login')
      .json({
        user: user.username,
        password: password,
      })
      .accept('json');

    response.assertStatus(422);
  });
});
