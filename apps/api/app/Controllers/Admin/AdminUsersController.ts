import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import {
  adminUsersDataSchema,
  adminUserDataSchema,
  adminUserPostsDataSchema,
} from '@weakassdev/shared/validators';

import * as GlobalManager from 'App/Managers/GlobalManager';
import User from 'App/Models/User';
import Post from 'App/Models/Post';

export default class AdminUsersController {
  public async index({ request, inertia }: HttpContextContract) {
    const page = request.input('page', 1);
    const limit = request.input('limit', 30);

    const [users, entityCount] = await Promise.all([
      User.query().paginate(page, limit),
      GlobalManager.getEntityCountPerPeriod('User'),
    ]);

    return inertia.render('Admin/Users/Index', {
      users: adminUsersDataSchema.parse(users.serialize()),
      entityCount,
    });
  }

  public async show({ request, inertia }: HttpContextContract) {
    const userUuid = request.param('id');
    const postsPage = request.input('postsPage', 1);
    const postsLimit = request.input('postsLimit', 10);

    const [user, posts] = await Promise.all([
      User.findOrFail(userUuid),
      Post.query()
        .where('authorId', userUuid)
        .preload('content')
        .withCount('postVersions', (query) => query.as('revisions'))
        .paginate(postsPage, postsLimit),
    ]);

    return inertia.render('Admin/Users/Show', {
      user: adminUserDataSchema.parse(user.serialize()),
      posts: adminUserPostsDataSchema.parse(posts.serialize()),
    });
  }

  public async edit({ inertia }: HttpContextContract) {
    return inertia.render('Admin/Users/Edit');
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
