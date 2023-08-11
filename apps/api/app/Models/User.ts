import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';
import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm';

import {
  userRoleSchema,
  userStatusSchema,
  type UserRole,
  type UserStatus,
} from '@weakassdev/shared/models';

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
  public avatarUrl: string | null;

  @column()
  public biography: string | null;

  @column()
  public externalLinks: { value: Array<{ [key: string]: string }> } = { value: [] };

  @column()
  public role: UserRole = userRoleSchema.Values.USER;

  @column()
  public status: UserStatus = userStatusSchema.Values.ACTIVE;

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
