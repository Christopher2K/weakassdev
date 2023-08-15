import { test } from '@japa/runner';

import { postsIndexResponseSchema } from '@weakassdev/shared/validators';

test.group('[posts index handler]', () => {
  test('responds to anonymous users', async ({ client }) => {
    const response = await client.get('/v1/posts');
    response.assertStatus(200);
  });

  test('pass the response data validator', async ({ client }) => {
    const response = await client.get('/v1/posts');
    postsIndexResponseSchema.parse(response.body());
  });

  test('returns 30 items by default', async ({ client, assert }) => {
    const response = await client.get('/v1/posts');
    const data = postsIndexResponseSchema.parse(response.body());

    assert.equal(data.data.length, 30);
  });

  test('takes pagination qs', async ({ client, assert }) => {
    const response = await client.get('/v1/posts?page=2&limit=10');
    const data = postsIndexResponseSchema.parse(response.body());

    assert.equal(data.data.length, 10);
    assert.equal(data.meta.currentPage, 2);
  });
});
