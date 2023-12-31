import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import {
  adminUsersDataSchema,
  adminUserDataSchema,
  adminUserPostsDataSchema,
} from '@weakassdev/shared/validators';
import * as PostManager from 'App/Managers/PostManager';

import * as GlobalManager from 'App/Managers/GlobalManager';
import User from 'App/Models/User';
import Post from 'App/Models/Post';

export default class AdminUsersController {
  public async index({ request, inertia }: HttpContextContract) {
    const page = request.input('page', 1);
    const limit = request.input('limit', 30);

    const [users, entityCount] = await Promise.all([
      User.query().orderBy('createdAt', 'desc').paginate(page, limit),
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
      ui: {
        showDeleteBtn: user.canBeArchived,
        showRestoreBtn: user.canBeRestored,
        showBanBtn: user.canBeBanned,
        showUnbanBtn: user.canBeUnbanned,
      },
    });
  }

  public async archive({ request, inertia, session, auth }: HttpContextContract) {
    const userUuid = request.param('id');
    const user = await User.findOrFail(userUuid);

    if (user.id === auth.user?.id) {
      session.flash('feedback', ['error', "Impossible d'archiver l'utilisateur courant."]);
      return inertia.redirectBack();
    }

    if (!user.canBeArchived) {
      session.flash('feedback', ['error', 'Cet utilisateur ne peut pas être archivé.']);
      return inertia.redirectBack();
    }

    await user.archive();
    session.flash('feedback', ['success', 'Compte archivé avec succès']);

    return inertia.redirectBack();
  }

  public async restore({ request, inertia, session }: HttpContextContract) {
    const userUuid = request.param('id');
    const user = await User.findOrFail(userUuid);

    if (!user.canBeRestored) {
      session.flash('feedback', ['error', 'Ce compte utilisateur ne peut pas pas être restoré.']);
      return inertia.redirectBack();
    }

    await user.restore();
    session.flash('feedback', ['success', 'Compte restoré avec succès']);

    return inertia.redirectBack();
  }

  public async ban({ request, inertia, session, auth }: HttpContextContract) {
    const userUuid = request.param('id');
    const user = await User.findOrFail(userUuid);

    if (user.id === auth.user?.id) {
      session.flash('feedback', ['error', "Impossible de bannir l'utilisateur courant."]);
      return inertia.redirectBack();
    }

    if (!user.canBeBanned) {
      session.flash('feedback', ['error', 'Ce compte utilisateur ne peut pas être banni.']);
      return inertia.redirectBack();
    }

    await Promise.all([user.ban(), PostManager.archiveAllUserPost({ userId: userUuid })]);

    session.flash('feedback', ['success', 'Utilisateur banni']);
    return inertia.redirectBack();
  }

  public async unban({ request, inertia, session }: HttpContextContract) {
    const userUuid = request.param('id');
    const user = await User.findOrFail(userUuid);

    if (!user.canBeUnbanned) {
      session.flash('feedback', ['error', 'Ce compte utilisateur ne peut pas pas être restoré.']);
      return inertia.redirectBack();
    }

    await Promise.all([user.unban(), PostManager.unarchiveAllUserPost({ userId: userUuid })]);

    session.flash('feedback', ['success', 'Ban levé']);
    return inertia.redirectBack();
  }
}
