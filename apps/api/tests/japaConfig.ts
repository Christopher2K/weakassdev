import { ApiRequest, ApiResponse } from '@japa/api-client';

// REQUEST STUFF

ApiRequest.macro('inertia', function () {
  this.headers({
    'X-Inertia': 'true',
    'X-Requested-With': 'XMLHttpRequest',
  });
  return this;
});

// RESPONSE STUFF

ApiResponse.macro('inertiaTemplate', function () {
  return this.body().component;
});

ApiResponse.macro('inertiaProps', function () {
  return this.body().props;
});

ApiResponse.macro('assertInertiaTemplate', function (templateName: string) {
  this.assertBodyContains({ component: templateName });
});

ApiResponse.macro('assertInertiaPropsContains', function (object: any) {
  this.assertBodyContains({ props: object });
});
