/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/
import Logger from '@ioc:Adonis/Core/Logger';
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import { ZodError } from '@weakassdev/shared/validators';

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger);
  }

  public async handle(error: any, ctx: HttpContextContract) {
    const url = ctx.request.url(false);
    // Admin part is using adonis validators since they deeply integrated with Inertia
    if (url.startsWith('/admin')) {
      return super.handle(error, ctx);
    }

    // API part is using Zod as models are shared between clients and backend
    if (error instanceof ZodError) {
      ctx.session.flash('errors', error.issues);
      ctx.session.flash('formErrors', error.issues);
      return ctx.response.unprocessableEntity({
        code: 'E_CUSTOM_VALIDATION_ERROR',
        issues: error.issues,
      });
    }

    return ctx.response.status(error.status ?? 500).send({
      code: error?.code ?? 'E_SERVER_ERROR',
      message: error?.message ?? 'E_SERVER_ERROR',
      stack: error?.stack ?? '',
    });
  }
}
