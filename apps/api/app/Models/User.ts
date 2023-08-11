import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';
import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm';

import type { UserRole, UserStatus } from '@weakassdev/shared/models';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public username: string;

  @column()
  public password: string;

  @column()
  public email: string;

  @column()
  public avatar_url: string;

  @column()
  public biography: string;

  @column()
  public externalLinks: Array<{ [key: string]: string }>;

  @column()
  public role: UserRole;

  @column()
  public status: UserStatus;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  // HOOKS
  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

  // MANAGEMENT
  static from(args: Parameters<typeof User.prototype.fill>[0]): User {
    let user = new User();
    user.fill(args);
    return user;
  }
}
