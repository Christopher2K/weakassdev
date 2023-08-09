import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

import type { UserRole, UserStatus } from '@weakassdev/shared/models';
import type { SignupRequest } from '@weakassdev/shared/validators';

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

  static from(args: Parameters<typeof User.prototype.fill>[0]): User {
    let user = new User();
    user.fill(args);
    return user;
  }
}
