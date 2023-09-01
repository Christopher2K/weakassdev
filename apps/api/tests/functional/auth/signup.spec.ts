import { test } from '@japa/runner';
import Database from '@ioc:Adonis/Lucid/Database';

import User from 'App/Models/User';
import UserFactory from 'Database/factories/UserFactory';

test.group('[signup handler]', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction();
    return () => Database.rollbackGlobalTransaction();
  });

  test('create an account for a new user', async ({ client }) => {
    const response = await client
      .post('/v1/auth/signup')
      .json({
        username: 'Chris',
        email: 'test@chris.test',
        password: 'Password1234',
      })
      .accept('json');

    const user = await User.findByOrFail('username', 'Chris');

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

  test('reject if the username already exists', async ({ client }) => {
    const data = await UserFactory.create();

    const newData = await UserFactory.merge({ username: data.username }).make();
    const response = await client.post('/v1/auth/signup').json(newData).accept('json');

    response.assertStatus(409);
    response.assertBodyContains({
      code: 'E_DATABASE_ERROR',
    });
  });

  test('reject if the email already exists', async ({ client }) => {
    const data = await UserFactory.create();

    const newData = await UserFactory.merge({ email: data.email }).make();
    const response = await client.post('/v1/auth/signup').json(newData).accept('json');

    response.assertStatus(409);
    response.assertBodyContains({
      code: 'E_DATABASE_ERROR',
    });
  });

  test('reject if the signup schema cannot be parsed', async ({ client }) => {
    const response = await client
      .post('/v1/auth/signup')
      .json({
        username: 'sending',
        email: 'crap',
      })
      .accept('json');

    response.assertStatus(422);
    response.assertBodyContains({
      code: 'E_CUSTOM_VALIDATION_ERROR',
    });
  });
});
