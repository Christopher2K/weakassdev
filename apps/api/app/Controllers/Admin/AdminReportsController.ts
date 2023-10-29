import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { postStatusSchema } from '@weakassdev/shared/models';
import { adminReportsDataSchema } from '@weakassdev/shared/validators';

import PostReport from 'App/Models/PostReport';

export default class AdminReportsController {
  public async index({ request, inertia }: HttpContextContract) {
    const page = request.input('page', 1);
    const limit = request.input('limit', 30);

    const reports = await PostReport.query()
      .whereHas('post', (query) => query.whereNot('status', postStatusSchema.Values.FLAGGED))
      .preload('reporter')
      .preload('post', (post) => post.preload('author').preload('content'))
      .orderBy('created_at')
      .paginate(page, limit);

    return inertia.render('Admin/Reports/Index', {
      reports: adminReportsDataSchema.parse(reports.serialize()),
    });
  }
}
