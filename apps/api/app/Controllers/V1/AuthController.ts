import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import User from 'App/Models/User';

import { signupRequestSchema, loginRequestSchema } from '@weakassdev/shared/validators';
import DatabaseErrorException from 'App/Exceptions/DatabaseErrorException';

export default class AuthController {
  public async signup(ctx: HttpContextContract) {
    const data = await signupRequestSchema.parseAsync(ctx.request.body());

    let user: User;
    try {
      user = await User.create(data);
    } catch (e) {
      throw new DatabaseErrorException(e);
    }

    await ctx.auth.login(user);
    return ctx.response.json({ status: 'todo' });
  }

  public async login(ctx: HttpContextContract) {
    const data = await loginRequestSchema.parseAsync(ctx.request.body());
    const user = await ctx.auth.verifyCredentials(data.username, data.password);

    await ctx.auth.login(user);

    return { status: 'todo' };
  }

  public async logout(ctx: HttpContextContract) {
    await ctx.auth.logout();
    return { status: 'todo' };
  }

  public async protected() {
    return { status: 'todo' };
  }
}
