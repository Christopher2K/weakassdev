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

  // TODO: This requires a whole ass migration
  // Post -1--*-> PostContent
  public update() {}

  public async destroy(ctx: HttpContextContract) {
    const params = entityShowParams.parse(ctx.params);
    const post = await Post.query()
      .where('id', params.id)
      .andWhere('status', postStatusSchema.Values.PUBLISHED)
      .firstOrFail();
    const user = ctx.auth.user;

    if (!user) return ctx.response.unauthorized();
    if (post.authorId !== user.id) return ctx.response.forbidden();

    await post
      .merge({
        status: postStatusSchema.Values.DELETED,
      })
      .save();

    return ctx.response.accepted(null);
  }

  public report() {}
}
