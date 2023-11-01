import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import { postReportOutcomeSchema, postStatusSchema } from '@weakassdev/shared/models';
import { adminReportsDataSchema } from '@weakassdev/shared/validators';

import PostReport from 'App/Models/PostReport';
import Post from 'App/Models/Post';

export default class AdminReportsController {
  public async index({ request, inertia }: HttpContextContract) {
    const page = request.input('page', 1);
    const limit = request.input('limit', 30);

    const reports = await PostReport.query()
      .whereHas('post', (query) => query.whereNot('status', postStatusSchema.Values.FLAGGED))
      .andWhereNull('outcome')
      .preload('reporter')
      .preload('post', (post) => post.preload('author').preload('content'))
      .orderBy('created_at')
      .paginate(page, limit);

    return inertia.render('Admin/Reports/Index', {
      reports: adminReportsDataSchema.parse(reports.serialize()),
    });
  }

  public async approveReport({ session, request, inertia }: HttpContextContract) {
    // const reportId = request.param('id');
    // const report = await PostReport.findOrFail(reportId);
    //
    // // Mark the reports as approved
    // await PostReport.query()
    //   .update({
    //     outcome: postReportOutcomeSchema.Values.APPROVED,
    //   })
    //   .where('postId', report.postId);
    //
    // // Mark the post as flagged
    // await Post.query().update({
    //   status: postStatusSchema.Values.FLAGGED,
    // });

    // Redirect to the list page using Inertia
    session.flash('success', 'Report approved. The post has been flagged.');
    return inertia.redirectBack();
  }

  public async rejectReport({ request, inertia, session }: HttpContextContract) {
    session.flash('success', 'Report rejected.');
    return inertia.redirectBack();
  }
}
