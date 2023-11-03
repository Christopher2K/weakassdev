import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

import AdminLoginValidator from 'App/Validators/AdminLoginValidator';
import * as GlobalManager from 'App/Manager/GlobalManager';

export default class AdminController {
  public async index({ inertia, auth, response }: HttpContextContract) {
    const loggedIn = auth.isAuthenticated;
    if (loggedIn) {
      response.redirect().toRoute('AdminController.dashboard');
    }

    return inertia.render('Admin/Login');
  }

  public async dashboard({ inertia }: HttpContextContract) {
    const { postCount, userCount } = await GlobalManager.getEntitiesCount('Post', 'User');
    return inertia.render('Admin/Dashboard', { postCount, userCount });
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
