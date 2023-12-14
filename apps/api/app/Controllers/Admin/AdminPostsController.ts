import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import * as PostManager from 'App/Managers/PostManager';

import { adminPostsDataSchema, adminPostDataSchema } from '@weakassdev/shared/validators';

import Post from 'App/Models/Post';

export default class AdminPostsController {
  public async index({ request, inertia }: HttpContextContract) {
    const page = request.input('page', 1);
    const limit = request.input('limit', 30);

    const posts = await Post.query()
      .preload('author')
      .preload('content')
      .withCount('postVersions', (query) => query.as('revisions'))
      .paginate(page, limit);

    return inertia.render('Admin/Posts/Index', {
      posts: adminPostsDataSchema.parse(posts.serialize()),
    });
  }

  public async show({ request, inertia }: HttpContextContract) {
    const id = request.param('id');

    const post = await Post.query()
      .preload('author')
      .preload('content')
      .withCount('postVersions', (query) => query.as('revisions'))
      .where('id', id)
      .firstOrFail();

    return inertia.render('Admin/Posts/Show', {
      post: adminPostDataSchema.parse(post.serialize()),
      ui: {
        showFlagButton: post.canBeFlagged,
        showUnflagButton: post.canBeUnflagged,
      },
    });
  }

  public async flag({ request, inertia, session }: HttpContextContract) {
    const id = request.param('id');
    await PostManager.flagPost({ postId: id });

    session.flash('feedback', ['success', 'Post restreint.']);
    return inertia.redirectBack();
  }

  public async unflag({ request, inertia, session }: HttpContextContract) {
    const id = request.param('id');
    await PostManager.unflagPost({ postId: id });

    session.flash('feedback', ['success', 'Le post est de nouveau disponible.']);
    return inertia.redirectBack();
  }
}
