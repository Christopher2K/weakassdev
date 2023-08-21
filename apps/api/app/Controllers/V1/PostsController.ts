import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import {} from 'luxon';

import {
  listQuerySchema,
  postsIndexResponseSchema,
  entityShowParams,
  postsShowResponseSchema,
  postsStoreRequestSchema,
  postsReportRequestSchema,
  postsReportResponseSchema,
} from '@weakassdev/shared/validators';
import { postStatusSchema } from '@weakassdev/shared/models';

import PostReport from 'App/Models/PostReport';
import PostContent from 'App/Models/PostContent';
import Post from 'App/Models/Post';

export default class PostsController {
  public async index(ctx: HttpContextContract) {
    const query = listQuerySchema.parse(ctx.request.qs());
    const data = await Post.query()
      .whereIn('status', [postStatusSchema.Values.PUBLISHED])
      .preload('author')
      .preload('content')
      .paginate(query.page, query.limit);

    return postsIndexResponseSchema.parse(data.serialize());
  }

  public async show(ctx: HttpContextContract) {
    const params = entityShowParams.parse(ctx.params);
    const data = await Post.query()
      .preload('author')
      .preload('content')
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
      authorId: user.id,
    });
    await PostContent.create({
      content: body.content,
      postId: post.id,
    });
    await Promise.all([post.load('content'), post.load('author')]);

    return postsShowResponseSchema.parse(post.serialize());
  }

  public async update(ctx: HttpContextContract) {
    const body = postsStoreRequestSchema.parse(ctx.request.body());
    const params = entityShowParams.parse(ctx.params);
    const user = ctx.auth.user;

    if (!user) return ctx.response.unauthorized();
    const post = await Post.query().preload('content').where('id', params.id).firstOrFail();

    if (!post.canBeUpdated) return ctx.response.forbidden();
    if (post.authorId !== user.id) return ctx.response.forbidden();
    if (post.content.content === body.content) return ctx.response.unprocessableEntity();

    await PostContent.create({
      content: body.content,
      postId: post.id,
    });

    await Promise.all([post.load('content'), post.load('author')]);

    return postsShowResponseSchema.parse(post.serialize());
  }

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

  public async report(ctx: HttpContextContract) {
    const params = entityShowParams.parse(ctx.params);
    const body = postsReportRequestSchema.parse(ctx.request.body());

    const user = ctx.auth.user;
    if (!user) return ctx.response.unauthorized();
    const post = await Post.query().where('id', params.id).firstOrFail();
    if (post.authorId === user.id) return ctx.response.forbidden();

    const existingReport = await PostReport.query()
      .where('reporter_id', user.id)
      .andWhere('post_id', post.id)
      .first();

    if (existingReport != null) {
      // The operation has already been done, error
      return ctx.response.unprocessableEntity({
        code: 'E_DUPLICATE',
        message: 'A report already exist for this post',
      });
    }

    const report = await PostReport.create({
      postId: post.id,
      reporterId: user.id,
      reason: body.reason,
      reasonContext: body.reasonContext,
    });

    return postsReportResponseSchema.parse(report.serialize());
  }
}
