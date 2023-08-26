import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AdminPostsController {
  public index(ctx: HttpContextContract) {
    return ctx.inertia.render('Admin/Posts/Index');
  }
}
