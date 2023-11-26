import { test } from '@japa/runner';
import Database from '@ioc:Adonis/Lucid/Database';

import { postStatusSchema } from '@weakassdev/shared/models';

import UserFactory from 'Database/factories/UserFactory';
import Post from 'App/Models/Post';
import PostFactory from 'Database/factories/PostFactory';
import * as PostManager from 'App/Managers/PostManager';

test.group('[post manager tests]', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction();
    return () => Database.rollbackGlobalTransaction();
  });

  test('archiveAllUserPost() - archive all post PUBLISHED posts for the user', async ({
    assert,
  }) => {
    const user = await UserFactory.create();
    const publishedPosts = await PostFactory.merge({
      status: postStatusSchema.Values.PUBLISHED,
      authorId: user.id,
    }).createMany(10);

    await PostFactory.merge({
      status: postStatusSchema.Values.DELETED,
      authorId: user.id,
    }).createMany(3);

    await PostFactory.merge({
      status: postStatusSchema.Values.FLAGGED,
      authorId: user.id,
    }).createMany(3);

    await PostManager.archiveAllUserPost({ userId: user.id });
    const archivedPosts = await Post.query()
      .where('authorId', user.id)
      .andWhere('status', postStatusSchema.Values.ARCHIVED);

    assert.lengthOf(archivedPosts, publishedPosts.length);
  });

  test('unarchiveAllUserPost() - restore all posts ARCHIVED for the user', async ({ assert }) => {
    const user = await UserFactory.create();
    const archivedPosts = await PostFactory.merge({
      status: postStatusSchema.Values.ARCHIVED,
      authorId: user.id,
    }).createMany(10);

    await PostFactory.merge({
      status: postStatusSchema.Values.DELETED,
      authorId: user.id,
    }).createMany(3);

    await PostFactory.merge({
      status: postStatusSchema.Values.FLAGGED,
      authorId: user.id,
    }).createMany(3);

    await PostManager.unarchiveAllUserPost({ userId: user.id });
    const publishedPosts = await Post.query()
      .where('authorId', user.id)
      .andWhere('status', postStatusSchema.Values.PUBLISHED);

    assert.lengthOf(publishedPosts, archivedPosts.length);
  });
});
