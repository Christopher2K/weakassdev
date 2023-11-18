import { test } from '@japa/runner';
import { userStatusSchema } from '@weakassdev/shared/models';

import UserFactory from 'Database/factories/UserFactory';

test.group('[user model tests]', () => {
  test('can delete if account is active', async ({ assert }) => {
    const user = await UserFactory.merge({
      status: userStatusSchema.Values.ACTIVE,
    }).make();

    assert.isTrue(user.canBeDeleted);
  });

  test('cannot delete if status is banned or already deleted', async ({ assert }) => {
    let user = await UserFactory.merge({
      status: userStatusSchema.Values.BANNED,
    }).make();
    assert.isFalse(user.canBeDeleted);

    user = await UserFactory.merge({
      status: userStatusSchema.Values.DELETED,
    }).make();
    assert.isFalse(user.canBeDeleted);
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
});
