import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Post from 'App/Models/Post';

import {
  listQuerySchema,
  postsIndexResponseSchema,
  entityShowParams,
  postsShowResponseSchema,
  postsStoreRequestSchema,
} from '@weakassdev/shared/validators';
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

  public async show(ctx: HttpContextContract) {
    const params = entityShowParams.parse(ctx.params);
    const data = await Post.query()
      .preload('author')
      .where('id', params.id)
      .andWhere('status', postStatusSchema.Values.PUBLISHED)
      .firstOrFail();

    return postsShowResponseSchema.parse(data.serialize());
  }

  public async store(ctx: HttpContextContract) {
    const body = postsStoreRequestSchema.parse(ctx.request.body());
    const user = ctx.auth.user;

    if (!user) return ctx.response.unauthorized();

    const post = await Post.create({
      content: body.content,
      authorId: user.id,
    });
    await post.load('author');

    return postsShowResponseSchema.parse(post.toJSON());
  }

  public update() {}

  public destroy() {}

  public report() {}
}
