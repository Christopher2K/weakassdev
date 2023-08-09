import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Hash from '@ioc:Adonis/Core/Hash';
import User from 'App/Models/User';

import { signupRequestSchema, loginRequestSchema } from '@weakassdev/shared/validators';

export default class AuthController {
  public async signup(ctx: HttpContextContract) {
    const data = await signupRequestSchema.parseAsync(ctx.request.body());
    const hashedPassword = await Hash.make(data.password);

    const user = User.from({
      ...data,
      password: hashedPassword,
    });
    await user.save();

    ctx.auth.login(user);

    return { status: 'todo' };
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
