import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AuthController {
  public index(ctx: HttpContextContract) {
    return ctx.inertia.render('Hello');
  }
}
