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
    const content = ctx.request.accepts(['html', 'json']);
    switch (content) {
      case 'html':
        return this.handleHtml(error, ctx);
      case 'json':
        return this.handleJson(error, ctx);
      default:
        return this.handleHtml(error, ctx);
    }
  }

  private handleJson(error: any, ctx: HttpContextContract) {
    if (error instanceof ZodError) {
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

  private handleHtml(error: any, ctx: HttpContextContract) {
    const { session, response, inertia } = ctx;

    if (['E_INVALID_AUTH_PASSWORD', 'E_INVALID_AUTH_UID'].includes(error.code)) {
      session.flash('errors', { login: error.message });
      return response.redirect('/admin');
    }

    switch (error.status) {
      case 401:
        return inertia.render('Error', { error: 'unauthorized' });
      case 403:
        return inertia.render('Error', { error: 'forbidden' });
      case 404:
        return inertia.render('Error', { error: 'not-found' });
      default:
        return inertia.render('Error', { error: 'server-error' });
    }
  }
}
