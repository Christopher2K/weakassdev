import { test } from '@japa/runner';

import UserFactory from 'Database/factories/UserFactory';

test.group('login scenarii', () => {
  test('show a 404 when not logged in ', async ({ visit }) => {
    const page = await visit('/admin/dashboard');
    await page.assertText('p', "Vous n'avez pas les autorisations requises");
  });

  test('throw an error when the account does not exist', async ({ visit, assert }) => {
    const page = await visit('/admin');
    await page.locator('input[name="username"]').fill('admin');
    await page.locator('input[name="password"]').fill('not_a_pasasword');
    await page.getByRole('button', { name: 'Se connecter' }).click();

    const snackbarKind = await page.getByRole('status').getAttribute('data-kind');

    assert.equal(snackbarKind, 'error');
  });

  test('throw an error when the account password is incorrect', async ({ visit, assert }) => {
    await UserFactory.merge({
      username: 'testUser',
      email: 'test@admin.fr',
      password: 'password',
      role: 'ADMIN',
    }).create();

    const page = await visit('/admin');
    await page.locator('input[name="username"]').fill('testUser');
    await page.locator('input[name="password"]').fill('fake_password');
    await page.getByRole('button', { name: 'Se connecter' }).click();

    const snackbarKind = await page.getByRole('status').getAttribute('data-kind');

    assert.equal(snackbarKind, 'error');
  });

  test('logs in', async ({ visit }) => {
    await UserFactory.merge({
      username: 'testuser',
      email: 'test@admin.fr',
      password: 'password',
      role: 'ADMIN',
    }).create();

    const page = await visit('/admin');
    await page.locator('input[name="username"]').fill('testuser');
    await page.locator('input[name="password"]').fill('password');
    await page.getByRole('button', { name: 'Se connecter' }).click();

    await page.waitForURL(/admin\/dashboard/);
    await page.assertUrlContains('/admin/dashboard');
  });
});
