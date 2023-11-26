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
import ForbiddenUserActionException from 'App/Exceptions/ForbiddenUserActionException';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public username: string;

  @column({ serializeAs: null })
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

  // Properties
  public get canBeArchived(): boolean {
    return this.status === userStatusSchema.Values.ACTIVE;
  }

  public get canBeRestored(): boolean {
    return this.status === userStatusSchema.Values.DELETED;
  }

  public get canBeBanned(): boolean {
    return this.status === userStatusSchema.Values.ACTIVE;
  }

  public get canBeUnbanned(): boolean {
    return this.status === userStatusSchema.Values.BANNED;
  }

  // Actions
  public archive() {
    if (!this.canBeArchived)
      throw new ForbiddenUserActionException("Impossible d'archiver cet utilisateur.");

    this.status = userStatusSchema.Values.DELETED;
    return this.save();
  }

  public restore() {
    if (!this.canBeRestored)
      throw new ForbiddenUserActionException('Impossible de restorer cet utilisateur.');

    this.status = userStatusSchema.Values.ACTIVE;
    return this.save();
  }

  public async ban() {
    if (!this.canBeBanned)
      throw new ForbiddenUserActionException('Impossible de bannir cet utilisateur.');

    this.status = userStatusSchema.Values.BANNED;
    const user = await this.save();

    return user;
  }

  public async unban() {
    if (!this.canBeUnbanned)
      throw new ForbiddenUserActionException('Impossible de rétablir cet utilisateur.');

    this.status = userStatusSchema.Values.ACTIVE;
    const user = await this.save();

    return user;
  }
}
