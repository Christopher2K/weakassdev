import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import * as PostManager from 'App/Managers/PostManager';
import Post from 'App/Models/Post';

import { postStatusSchema, postReportOutcomeSchema } from '@weakassdev/shared/models';
import { adminReportedPostsDataSchema } from '@weakassdev/shared/validators';

import PostReport from 'App/Models/PostReport';
import { postReportReasonSchema } from '@weakassdev/shared/models';

export default class AdminReportsController {
  public async index({ request, inertia }: HttpContextContract) {
    const page = request.input('page', 1);
    const limit = request.input('limit', 30);

    // Post with reports
    const posts = await Post.query()
      .whereNot('status', postStatusSchema.Values.FLAGGED)
      .andWhereHas('reports', (query) => query.whereNull('outcome'))
      .preload('author', (author) =>
        author.preload('posts', (posts) => posts.where('status', postStatusSchema.Values.FLAGGED)),
      )
      .preload('content')
      .preload('reports', (report) => report.preload('reporter'))
      .withAggregate('reports', (query) =>
        query
          .count('*')
          .groupBy('reason')
          .where('reason', postReportReasonSchema.Values.OFFENSIVE)
          .as('offensiveCount'),
      )
      .withAggregate('reports', (query) =>
        query
          .count('*')
          .groupBy('reason')
          .where('reason', postReportReasonSchema.Values.DUPLICATE)
          .as('duplicateCount'),
      )
      .paginate(page, limit);

    return inertia.render('Admin/Reports/Index', {
      posts: adminReportedPostsDataSchema.parse(posts.serialize()),
    });
  }

  public async approveReport({ request, session, inertia }: HttpContextContract) {
    const postId = request.body()['id'];
    const post = await Post.query()
      .where('id', postId)
      .andWhereNot('status', postStatusSchema.Values.FLAGGED)
      .andHas('reports')
      .firstOrFail();

    // Mark the reports as approved
    await PostReport.query()
      .update({
        outcome: postReportOutcomeSchema.Values.APPROVED,
      })
      .where('postId', post.id);

    // Mark the post as flagged
    await PostManager.flagPost({ postId: post.id });

    // Redirect to the list page using Inertia
    session.flash('feedback', ['success', 'Signalement accepté, le poste à bien été restreint']);
    return inertia.redirectBack();
  }

  public async rejectReport({ request, inertia, session }: HttpContextContract) {
    const postId = request.body()['id'];
    const post = await Post.query()
      .where('id', postId)
      .andWhereNot('status', postStatusSchema.Values.FLAGGED)
      .andHas('reports')
      .firstOrFail();

    // Mark the reports as rejected
    await PostReport.query()
      .update({
        outcome: postReportOutcomeSchema.Values.REJECTED,
      })
      .where('postId', post.id);

    session.flash('feedback', ['success', 'Signalement refusé, le poste est toujours en ligne.']);
    return inertia.redirectBack();
  }
}
