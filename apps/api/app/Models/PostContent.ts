import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';

import Post from './Post';
import UserPostContentReaction from './UserPostContentReaction';

export default class PostContent extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public content: string;

  @column()
  public postId: string;

  @belongsTo(() => Post, {
    foreignKey: 'postId',
  })
  public post: BelongsTo<typeof Post>;

  @hasMany(() => UserPostContentReaction, {
    foreignKey: 'postContentId',
  })
  public reactions: HasMany<typeof UserPostContentReaction>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
