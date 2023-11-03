/*
|--------------------------------------------------------------------------
| Inertia Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Inertia from '@ioc:EidelLev/Inertia';

import { authenticatedUserResponseSchema } from '@weakassdev/shared/validators';

Inertia.share({
  formErrors: (ctx) => {
    return ctx.session.flashMessages.get('formErrors');
  },
  user: (ctx) => {
    const user = ctx.auth.user;
    if (!user) return null;

    return authenticatedUserResponseSchema.parse(user);
  },
  feedback: (ctx) => ctx.session.flashMessages.get('feedback'),
}).version(() => Inertia.manifestFile('public/assets/manifest.json'));
