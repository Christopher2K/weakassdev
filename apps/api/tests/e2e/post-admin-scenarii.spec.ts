import { test } from '@japa/runner';
import { BrowserContext } from 'playwright';

import TestUtils from '@ioc:Adonis/Core/TestUtils';
import UserFactory from 'Database/factories/UserFactory';

import { AdminPage } from './pages/admin-page';
import PostFactory from 'Database/factories/PostFactory';

test.group('post admin scenarrii', (group) => {
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

  async function goToPostPage(visit: BrowserContext['visit']) {
    const adminPage = await visit(AdminPage);
    const page = await adminPage.loginAs({ username: adminUsername, password: adminPassword });
    await page.getByRole('navigation').getByRole('link', { name: 'Posts' }).click();
    return page;
  }

  test('can restrict a post', async ({ visit, assert }) => {
    await PostFactory.with('content').with('author').createMany(20);
    const page = await goToPostPage(visit);
    await page
      .getByRole('table')
      .getByRole('row')
      .nth(2)
      .locator('td:nth-child(7)')
      .getByRole('button')
      .click();

    await page.getByText('Voir les détails').click();

    await page.getByRole('button', { name: 'Resteindre le post' }).click();

    let snackbarKind: string | null;
    snackbarKind = await page.getByRole('status').getAttribute('data-kind');
    assert.equal(snackbarKind, 'success');
    await page.assertExists(page.getByText('FLAGGED'));
  });

  test('can restore a post after archiving it', async ({ visit, assert }) => {
    await PostFactory.with('content').with('author').createMany(20);
    const page = await goToPostPage(visit);
    await page
      .getByRole('table')
      .getByRole('row')
      .nth(2)
      .locator('td:nth-child(7)')
      .getByRole('button')
      .click();

    await page.getByText('Voir les détails').click();

    await page.getByRole('button', { name: 'Resteindre le post' }).click();

    let snackbarKind: string | null;
    snackbarKind = await page.getByRole('status').getAttribute('data-kind');
    assert.equal(snackbarKind, 'success');
    await page.assertExists(page.getByText('FLAGGED'));

    await page.getByRole('button', { name: 'Restaurer le post' }).click();
    snackbarKind = await page.getByRole('status').getAttribute('data-kind');
    assert.equal(snackbarKind, 'success');
    await page.assertExists(page.getByText('PUBLISHED'));
  });
});
