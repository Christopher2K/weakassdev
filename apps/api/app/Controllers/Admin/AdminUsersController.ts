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

  public async show({ request, inertia }: HttpContextContract) {
    const userUuid = request.param('id');
    const user = await User.findByOrFail('id', userUuid);

    return inertia.render('Admin/Users/Show', {
      user: user.serialize(),
    });
  }

  public async edit({ inertia }: HttpContextContract) {
    return inertia.render('Admin/Users/Edit');
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
