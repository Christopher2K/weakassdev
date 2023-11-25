import { BaseCommand, flags } from '@adonisjs/core/build/standalone';

export default class AdminCreate extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'admin:create';

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Create a new admin user';

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  };

  @flags.boolean()
  public interactive: boolean = true;

  @flags.boolean()
  public failSilently: boolean = false;

  public async run() {
    const { default: User } = await import('App/Models/User');
    const { default: Env } = await import('@ioc:Adonis/Core/Env');

    this.logger.info('🔥 New admin creation!');

    let email: string | undefined = Env.get('ADMIN_EMAIL');
    let username: string | undefined = Env.get('ADMIN_USERNAME');
    let password: string | undefined = Env.get('ADMIN_DEFAULT_PASSWORD');

    if (this.interactive) {
      email = await this.prompt.ask('Enter email');
      username = await this.prompt.ask('Choose an username');
      password = await this.prompt.secure('Choose a password');
    }

    this.logger.info('🔄 Processing...');

    try {
      await User.create({
        email,
        password,
        username,
        role: 'ADMIN',
      });
      this.logger.success('✅ Done!');
    } catch (e) {
      switch (e.code) {
        // UNIQUE VIOLATION
        case '23505':
          await this.onError('❌ An admin with this username or this email does already exist.');
          break;
        // NOT NULL VIOLATION
        case '23502':
          await this.onError(
            '❌ Make sure that ADMIN_EMAIL ADMIN_USERNAME and ADMIN_DEFAULT_PASSWORD env vars are defined.',
          );
          break;
        default:
          this.logger.error(e);
          await this.onError('❌ Admin was not created');
      }
    }
  }

  private async onError(message: string) {
    this.logger.error(message);
    if (!this.failSilently) {
      this.exitCode = 1;
    }
    await this.exit();
  }
}
