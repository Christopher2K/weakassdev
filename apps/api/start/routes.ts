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

// API ROUTES
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
      destroy: ['auth'],
    });
  Route.group(() => {
    Route.post(':id/report', 'PostsController.report');
  })
    .prefix('posts')
    .middleware('auth');
})
  .namespace('App/Controllers/V1')
  .prefix('v1');

// ADMIN ROUTES
Route.group(() => {
  // PAGES
  Route.get('', 'AdminController.index');
  Route.get('logout', 'AdminController.logout');
  // FORM SUBMISSIONS
  Route.post('login', 'AdminController.login');

  Route.group(() => {
    // PROTECTED PAGES
    Route.get('dashboard', 'AdminController.dashboard');

    Route.resource('users', 'AdminUsersController').except(['store', 'create']).as('adminUsers');
    Route.group(() => {
      // Single user actions
      Route.patch('users/:id/archive', 'AdminUsersController.archive');
      Route.patch('users/:id/restore', 'AdminUsersController.restore');
      Route.patch('users/:id/ban', 'AdminUsersController.ban');
      Route.patch('users/:id/unban', 'AdminUsersController.unban');
    });

    Route.resource('posts', 'AdminPostsController').except(['store', 'create']).as('adminPosts');
    Route.group(() => {
      // Single post actions
      Route.patch('posts/:id/flag', 'AdminPostsController.flag');
      Route.patch('posts/:id/unflag', 'AdminPostsController.unflag');
    });

    Route.resource('reports', 'AdminReportsController')
      .except(['store', 'create'])
      .as('adminReports');
    Route.group(() => {
      // Single report actions
      Route.post('reports/approve', 'AdminReportsController.approveReport');
      Route.post('reports/reject', 'AdminReportsController.rejectReport');
    });
  })
    .middleware('auth')
    .middleware('admin');
})
  .namespace('App/Controllers/Admin')
  .middleware('silentAuth')
  .prefix('admin');
