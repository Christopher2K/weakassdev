import { Exception } from '@adonisjs/core/build/standalone';

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new DatabaseErrorException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class DatabaseErrorException extends Exception {
  constructor(e: unknown) {
    const message =
      typeof e === 'object' && e !== null && 'message' in e && typeof e.message === 'string'
        ? e.message
        : '';

    super(message, 409, 'E_DATABASE_ERROR');
  }
}
