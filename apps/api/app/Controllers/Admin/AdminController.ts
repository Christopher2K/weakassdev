import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

import AdminLoginValidator from 'App/Validators/AdminLoginValidator';

export default class AdminController {
  // PAGES
  public index({ inertia }: HttpContextContract) {
    return inertia.render('Admin/Login');
  }

  public dashboard(ctx: HttpContextContract) {
    return ctx.inertia.render('Admin/Dashboard');
  }

  public unauthorized({ inertia }: HttpContextContract) {
    return inertia.render('Admin/Error', { error: 'Unauthorized' });
  }

  // FORM SUBMISSIONS
  public async login({ request, response, auth }: HttpContextContract) {
    const data = await request.validate(AdminLoginValidator);
    (await auth.attempt(data.username, data.password)) as Promise<User>;

    return response.redirect().toRoute('AdminController.dashboard');
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout();
    return response.redirect().toRoute('AdminController.index');
  }
}
