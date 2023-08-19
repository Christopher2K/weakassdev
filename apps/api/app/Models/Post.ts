import { DateTime } from 'luxon';
import {
  BaseModel,
  BelongsTo,
  HasMany,
  HasOne,
  belongsTo,
  column,
  hasMany,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm';

import { PostStatus, postStatusSchema } from '@weakassdev/shared/models';

import User from 'App/Models/User';

import PostContent from './PostContent';

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public status: PostStatus = postStatusSchema.Values.PUBLISHED;

  @column()
  public authorId: string;

  @belongsTo(() => User, {
    foreignKey: 'authorId',
  })
  public author: BelongsTo<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasOne(() => PostContent, {
    onQuery(query) {
      return query.orderBy('created_at', 'desc').first();
    },
  })
  public content: HasOne<typeof PostContent>;

  @hasMany(() => PostContent, {
    foreignKey: 'postId',
  })
  public postVersions: HasMany<typeof PostContent>;
}
