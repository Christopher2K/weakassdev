/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  // AUTHENTICATION
  Route.group(() => {
    Route.post('signup', 'AuthController.signup');
    Route.post('login', 'AuthController.login');
    Route.post('logout', 'AuthController.logout').middleware('auth');
  }).prefix('auth');

  // POSTS
  Route.resource('posts', 'PostsController')
    .apiOnly()
    .middleware({
      store: ['auth'],
      update: ['auth'],
    });
  Route.group(() => {
    Route.post(':id/report', 'PostsController.report');
  })
    .prefix('posts')
    .middleware('auth');
})
  .namespace('App/Controllers/V1')
  .prefix('v1');
