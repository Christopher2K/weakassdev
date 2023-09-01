import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';

export default class IndexSeeder extends BaseSeeder {
  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    console.log('Running: ' + Seeder.default.name);
    await new Seeder.default(this.client).run();
    console.log('Done: ' + Seeder.default.name);
  }

  public async run() {
    await this.runSeeder(await import('../UserSeeder'));
    await this.runSeeder(await import('../PostSeeder'));
    await this.runSeeder(await import('../UserPostContentReactionSeeder'));
    await this.runSeeder(await import('../PostReportSeeder'));
  }
}
