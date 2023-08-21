import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';
import { BaseModel, column, beforeSave, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';

import {
  userRoleSchema,
  userStatusSchema,
  type UserRole,
  type UserStatus,
} from '@weakassdev/shared/models';

import Post from './Post';

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
  public avatarUrl: string | null = null;

  @column()
  public biography: string | null = null;

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

  @hasMany(() => Post, {
    foreignKey: 'authorId',
  })
  public posts: HasMany<typeof Post>;

  // HOOKS
  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
