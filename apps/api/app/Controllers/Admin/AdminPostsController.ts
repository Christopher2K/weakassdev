import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { adminPostsDataSchema } from '@weakassdev/shared/validators';

import Post from 'App/Models/Post';

export default class AdminPostsController {
  public async index({ request, inertia }: HttpContextContract) {
    const page = request.input('page', 1);
    const limit = request.input('limit', 30);

    const posts = await Post.query()
      .preload('author')
      .preload('content')
      .withAggregate('postVersions', (query) => {
        return query.count('*').as('revisions').groupBy('post_id');
      })
      .paginate(page, limit);

    return inertia.render('Admin/Posts/Index', {
      posts: adminPostsDataSchema.parse(posts.serialize()),
    });
  }

  public async show({ inertia }: HttpContextContract) {
    return inertia.render('Admin/Posts/Show', {});
  }
}
