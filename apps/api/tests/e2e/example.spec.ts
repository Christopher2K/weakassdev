import { test } from '@japa/runner';

test('Load the admin panel page', async ({ visit }) => {
  const page = await visit('/admin');
  await page.assertText('h1', 'Weak A** Dev');
});
