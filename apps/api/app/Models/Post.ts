import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';

import { PostStatus, postStatusSchema } from '@weakassdev/shared/models';

import User from 'App/Models/User';

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public content: string;

  @column()
  public status: PostStatus = postStatusSchema.Values.PUBLISHED;

  @column()
  public authorId: string;

  @belongsTo(() => User)
  public author: BelongsTo<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
