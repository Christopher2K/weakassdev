import Database from '@ioc:Adonis/Lucid/Database';
import { test } from '@japa/runner';
import { userStatusSchema } from '@weakassdev/shared/models';

import UserFactory from 'Database/factories/UserFactory';

test.group('[user model tests]', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction();
    return () => Database.rollbackGlobalTransaction();
  });

  test('can delete if account is active', async ({ assert }) => {
    const user = await UserFactory.merge({
      status: userStatusSchema.Values.ACTIVE,
    }).make();

    assert.isTrue(user.canBeArchived);
  });

  test('cannot delete if status is banned or already deleted', async ({ assert }) => {
    let user = await UserFactory.merge({
      status: userStatusSchema.Values.BANNED,
    }).make();
    assert.isFalse(user.canBeArchived);

    user = await UserFactory.merge({
      status: userStatusSchema.Values.DELETED,
    }).make();
    assert.isFalse(user.canBeArchived);
  });

  test('cannot restore if account is active or banned', async ({ assert }) => {
    let user = await UserFactory.merge({
      status: userStatusSchema.Values.ACTIVE,
    }).make();
    assert.isFalse(user.canBeRestored);

    user = await UserFactory.merge({
      status: userStatusSchema.Values.BANNED,
    }).make();
    assert.isFalse(user.canBeRestored);
  });

  test('can restore if account is deleted', async ({ assert }) => {
    const user = await UserFactory.merge({
      status: userStatusSchema.Values.DELETED,
    }).make();

    assert.isTrue(user.canBeRestored);
  });

  test('archive the user', async ({ assert }) => {
    const user = await UserFactory.merge({
      status: userStatusSchema.Values.ACTIVE,
    }).create();

    await user.archive();

    assert.equal(user.status, userStatusSchema.Values.DELETED);
  });

  test('cannot archive the user if the account is not active', async ({ assert }) => {
    const user = await UserFactory.merge({
      status: userStatusSchema.Values.BANNED,
    }).create();

    assert.throws(() => {
      user.archive();
    });
  });

  test('restore the user', async ({ assert }) => {
    const user = await UserFactory.merge({
      status: userStatusSchema.Values.DELETED,
    }).create();

    await user.restore();

    assert.equal(user.status, userStatusSchema.Values.ACTIVE);
  });

  test('cannot restore the user if the account is not archived', async ({ assert }) => {
    const user = await UserFactory.merge({
      status: userStatusSchema.Values.BANNED,
    }).create();

    assert.throws(() => {
      user.restore();
    });
  });

  test('ban the user', async ({ assert }) => {
    const user = await UserFactory.merge({
      status: userStatusSchema.Values.ACTIVE,
    }).create();

    await user.ban();

    assert.equal(user.status, userStatusSchema.Values.BANNED);
  });

  test('cannot ban the user if the status is not active', async ({ assert }) => {
    const user = await UserFactory.merge({
      status: userStatusSchema.Values.DELETED,
    }).create();

    await assert.rejects(() => user.ban());
  });

  test('unban the user', async ({ assert }) => {
    const user = await UserFactory.merge({
      status: userStatusSchema.Values.BANNED,
    }).create();

    await user.unban();

    assert.equal(user.status, userStatusSchema.Values.ACTIVE);
  });

  test('cannot unban the user if the status is not banned', async ({ assert }) => {
    const user = await UserFactory.merge({
      status: userStatusSchema.Values.ACTIVE,
    }).create();

    await assert.rejects(() => user.unban());
  });
});
