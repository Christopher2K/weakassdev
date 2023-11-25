import { test } from '@japa/runner';

import TestUtils from '@ioc:Adonis/Core/TestUtils';

import UserFactory from 'Database/factories/UserFactory';

import { AdminPage } from './pages/admin-page';

test.group('user admin scenarii', (group) => {
  const adminUsername = 'testadmin';
  const adminPassword = 'password';

  group.each.setup(async () => {
    await UserFactory.merge({
      role: 'ADMIN',
      email: 'testadmin@test.fr',
      username: adminUsername,
      password: adminPassword,
    }).create();

    // TODO: This belongs to the configure suite function BUT there's a bug
    return TestUtils.db().truncate();
  });

  test('show a full user list', async ({ visit, assert }) => {
    const adminPage = await visit(AdminPage);
    const page = await adminPage.loginAs({ username: adminUsername, password: adminPassword });
    await page.getByRole('navigation').getByRole('link', { name: 'Utilisateurs' }).click();
    await page.waitForSelector('table');
    const rowCount = await page.getByRole('table').getByRole('row').count();

    assert.equal(rowCount, 3);
  });

  test('show a max of 30 users', async ({ visit, assert }) => {
    await UserFactory.createMany(100);

    const adminPage = await visit(AdminPage);
    const page = await adminPage.loginAs({ username: adminUsername, password: adminPassword });
    await page.getByRole('navigation').getByRole('link', { name: 'Utilisateurs' }).click();
    await page.waitForSelector('table');
    const rowCount = await page.getByRole('table').getByRole('row').count();

    assert.equal(rowCount, 32);
  });

  test('show as many pages as needed for the user list', async ({ visit, assert }) => {
    await UserFactory.createMany(100);

    const adminPage = await visit(AdminPage);
    const page = await adminPage.loginAs({ username: adminUsername, password: adminPassword });
    await page.getByRole('navigation').getByRole('link', { name: 'Utilisateurs' }).click();

    let rowCount = 0;

    await page.waitForSelector('table');
    rowCount = await page.getByRole('table').getByRole('row').count();
    assert.equal(rowCount, 32);

    await page.getByRole('link', { name: 'Page suivante' }).first().click();
    await page.waitForURL(/\?page=2/);
    await page.waitForSelector('table');
    rowCount = await page.getByRole('table').getByRole('row').count();
    assert.equal(rowCount, 32);

    await page.getByRole('link', { name: 'Page suivante' }).first().click();
    await page.waitForURL(/\?page=3/);
    await page.waitForSelector('table');
    rowCount = await page.getByRole('table').getByRole('row').count();
    assert.equal(rowCount, 32);

    await page.getByRole('link', { name: 'Page suivante' }).first().click();
    await page.waitForURL(/\?page=4/);
    await page.waitForSelector('table');
    rowCount = await page.getByRole('table').getByRole('row').count();
    assert.equal(rowCount, 13);
  });

  test('show a single user details', async ({ visit }) => {
    const user = await UserFactory.create();

    const adminPage = await visit(AdminPage);
    const page = await adminPage.loginAs({ username: adminUsername, password: adminPassword });
    await page.getByRole('navigation').getByRole('link', { name: 'Utilisateurs' }).click();
    await page.getByRole('row', { name: user.username }).getByRole('button').click();
    await page.getByRole('link', { name: 'Voir les détails' }).click();

    await page.waitForURL((url) => url.toString().includes(user.id));
  });

  test('cannot archive the currently logged account', async ({ visit, assert }) => {
    const adminPage = await visit(AdminPage);
    const page = await adminPage.loginAs({ username: adminUsername, password: adminPassword });
    await page.getByRole('navigation').getByRole('link', { name: 'Utilisateurs' }).click();
    await page.getByRole('row', { name: adminUsername }).getByRole('button').click();
    await page.getByRole('link', { name: 'Voir les détails' }).click();
    await page.getByRole('button', { name: 'Archiver ce compte' }).click();

    const snackbarKind = await page.getByRole('status').getAttribute('data-kind');
    assert.equal(snackbarKind, 'error');
  });
});
