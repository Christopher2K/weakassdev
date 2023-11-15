import '@japa/api-client';

declare module '@japa/api-client' {
  interface ApiRequest {
    inertia(): this;
  }

  interface ApiResponse {
    inertiaProps<T = any>(): T;
    inertiaTemplate(): string;
    assertInertiaTemplate(templateName: string): void;
    assertInertiaPropsContains(object: any): void;
  }
}
