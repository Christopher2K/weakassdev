import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
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
    });
  }
}
