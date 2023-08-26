import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

import AdminLoginValidator from 'App/Validators/AdminLoginValidator';

export default class AdminController {
  public index({ inertia }: HttpContextContract) {
    return inertia.render('Admin/Login');
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const data = await request.validate(AdminLoginValidator);
    (await auth.attempt(data.username, data.password)) as Promise<User>;

    return response.redirect().toRoute('AdminController.dashboard');
  }

  public dashboard(ctx: HttpContextContract) {
    return ctx.inertia.render('Admin/Dashboard');
  }
}
