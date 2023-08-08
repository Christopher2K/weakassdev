import type { ApplicationContract } from '@ioc:Adonis/Core/Application';

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
    const { BaseModel } = await import('@ioc:Adonis/Lucid/Orm');
    const { CustomNamingStrategy } = await import('App/Models/utils');
    BaseModel.namingStrategy = new CustomNamingStrategy();
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
