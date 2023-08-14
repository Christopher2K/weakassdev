import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Post from 'App/Models/Post';

import { listQuerySchema, postsIndexResponseSchema } from '@weakassdev/shared/validators';
import { postStatusSchema } from '@weakassdev/shared/models';

export default class PostsController {
  public async index(ctx: HttpContextContract) {
    const query = listQuerySchema.parse(ctx.request.qs());
    const data = await Post.query()
      .whereIn('status', [postStatusSchema.Values.PUBLISHED])
      .preload('author')
      .paginate(query.page, query.limit);

    return postsIndexResponseSchema.parse(data.serialize());
  }

  public store() {}

  public show() {}

  public update() {}

  public destroy() {}

  public report() {}
}
