import { DateTime } from 'luxon';
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm';

import User from './User';
import PostContent from './PostContent';

export default class UserPostContentReaction extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public reaction: string;

  @column()
  public userId: string;

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  public user: BelongsTo<typeof User>;

  @column()
  public postContentId: string;

  @belongsTo(() => PostContent, {
    foreignKey: 'postContentId',
  })
  public postContent: BelongsTo<typeof PostContent>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
