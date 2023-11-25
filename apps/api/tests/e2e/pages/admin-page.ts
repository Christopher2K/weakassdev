import { BasePage } from '@japa/browser-client';

export class AdminPage extends BasePage {
  url = '/admin';

  async loginAs({ username, password }: { username: string; password: string }) {
    await this.page.locator('input[name="username"]').fill(username);
    await this.page.locator('input[name="password"]').fill(password);
    await this.page.getByRole('button', { name: 'Se connecter' }).click();
    await this.page.waitForURL(/admin\/dashboard/);

    return this.page;
  }
}
