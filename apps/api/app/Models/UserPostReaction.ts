import { DateTime } from 'luxon';
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm';

import User from './User';
import Post from './Post';

export default class UserPostReaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public reaction: string;

  @hasOne(() => User, {
    foreignKey: 'user_id',
  })
  public user: HasOne<typeof User>;

  @hasOne(() => Post, {
    foreignKey: 'post_id',
  })
  public post: HasOne<typeof Post>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
