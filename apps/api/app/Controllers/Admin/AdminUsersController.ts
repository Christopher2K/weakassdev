import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import { adminUsersDataSchema } from '@weakassdev/shared/validators';

import User from 'App/Models/User';

export default class AdminUsersController {
  public async index({ request, inertia }: HttpContextContract) {
    const page = request.input('page', 1);
    const limit = request.input('limit', 30);

    const users = await User.query().paginate(page, limit);

    return inertia.render('Admin/Users/Index', {
      users: adminUsersDataSchema.parse(users.serialize()),
    });
  }
}
