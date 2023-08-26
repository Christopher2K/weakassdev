import { BaseCommand } from '@adonisjs/core/build/standalone';

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

  public async run() {
    const { default: User } = await import('App/Models/User');

    this.logger.info('🔥 New admin creation!');

    const email = await this.prompt.ask('Enter email');
    const username = await this.prompt.ask('Choose an username');
    const password = await this.prompt.secure('Choose a password');

    this.logger.info('🔄 Processing...');

    await User.create({
      email,
      password,
      username,
      role: 'ADMIN',
    });

    this.logger.success('✅ Done!');
  }
}
