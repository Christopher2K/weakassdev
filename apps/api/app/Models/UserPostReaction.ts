import { DateTime } from 'luxon';
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm';

import User from './User';
import Post from './Post';

export default class UserPostReaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public reaction: string;

  @column()
  public userId: string;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @column()
  public postId: string;

  @belongsTo(() => Post)
  public post: BelongsTo<typeof Post>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
