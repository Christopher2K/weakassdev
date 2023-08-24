import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AdminController {
  public login(ctx: HttpContextContract) {
    return ctx.inertia.render('Admin/Login');
  }

  public dashboard(ctx: HttpContextContract) {
    return ctx.inertia.render('Admin/Dashboard');
  }
}
