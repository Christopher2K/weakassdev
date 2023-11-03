import { AuthenticationException } from '@adonisjs/auth/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { userRoleSchema } from '@weakassdev/shared/models';

export default class AdminMiddleware {
  protected redirectTo = 'https://api.weakassdev.test/admin';

  public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    if (auth.user?.role === userRoleSchema.Values.ADMIN) {
      await next();
    } else {
      throw new AuthenticationException(
        'Unauthorized access',
        'E_UNAUTHORIZED_ACCESS',
        'web',
        this.redirectTo,
      );
    }
  }
}
