import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

import { signupRequestSchema, loginRequestSchema } from '@weakassdev/shared/validators';

export default class AuthController {
  public async signup(ctx: HttpContextContract) {
    const data = await signupRequestSchema.parseAsync(ctx.request.body());
    console.log(data.password);
    const user = User.from(data);
    await user.save();

    return { status: 'todo' };
  }

  public async login(ctx: HttpContextContract) {
    const data = await loginRequestSchema.parseAsync(ctx.request.body());
    console.log(data);
    return { status: 'todo' };
  }
}
