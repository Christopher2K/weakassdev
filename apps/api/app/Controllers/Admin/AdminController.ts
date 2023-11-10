import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

import AdminLoginValidator from 'App/Validators/AdminLoginValidator';
import * as GlobalManager from 'App/Manager/GlobalManager';
import * as PostManager from 'App/Manager/PostManager';

export default class AdminController {
  public async index({ inertia, auth, response }: HttpContextContract) {
    const loggedIn = auth.isAuthenticated;
    if (loggedIn) {
      response.redirect().toRoute('AdminController.dashboard');
    }

    return inertia.render('Admin/Login');
  }

  public async dashboard({ inertia }: HttpContextContract) {
    const [{ postCount, userCount }, reportedPostCount] = await Promise.all([
      GlobalManager.getEntitiesCount('Post', 'User'),
      PostManager.getReportedPostsCount(),
    ]);

    return inertia.render('Admin/Dashboard/Index', { postCount, userCount, reportedPostCount });
  }

  // FORM SUBMISSIONS
  public async login({ request, response, auth, inertia, session }: HttpContextContract) {
    const data = await request.validate(AdminLoginValidator);
    try {
      (await auth.attempt(data.username, data.password)) as Promise<User>;
      return response.redirect().toRoute('AdminController.dashboard');
    } catch (e) {
      session.flash('feedback', ['error', 'Identifiant ou mot de passe incorrect.']);
      return inertia.redirectBack();
    }

    return response.redirect().toRoute('AdminController.dashboard');
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout();
    return response.redirect().toRoute('AdminController.index');
  }
}
