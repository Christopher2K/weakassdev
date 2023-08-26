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

Inertia.share({
  formErrors: (ctx) => {
    return ctx.session.flashMessages.get('formErrors');
  },
  errors: (ctx) => {
    return ctx.session.flashMessages.get('errors');
  },
}).version(() => Inertia.manifestFile('public/assets/manifest.json'));
