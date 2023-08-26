import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class AdminController {
  public index({ inertia }: HttpContextContract) {
    return inertia.render('Admin/Login');
  }

  public async login(ctx: HttpContextContract) {
    const { response } = ctx;

    const data = await ctx.request.validate({
      schema: schema.create({
        email: schema.string({ trim: true }, [rules.email()]),
        password: schema.string({}, [rules.minLength(8)]),
      }),
    });

    return response.redirect().toRoute('AdminController.dashboard');
  }

  public dashboard(ctx: HttpContextContract) {
    return ctx.inertia.render('Admin/Dashboard');
  }
}
