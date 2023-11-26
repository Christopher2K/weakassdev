import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new ForbiddenUserActionException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class ForbiddenUserActionException extends Exception {
  constructor(
    public message: string,
    public status: number = 403,
    public code: string = 'E_FORBIDDEN_USER_ACTION',
  ) {
    super(message, status, code);
  }

  public async handle(error: this, ctx: HttpContextContract) {
    ctx.response.status(error.status).send(error.message);
  }
}
