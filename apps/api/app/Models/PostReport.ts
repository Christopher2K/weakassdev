import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';

import type { PostReportReason, PostReportOutcome } from '@weakassdev/shared/models';

import Post from './Post';
import User from './User';

export default class PostReport extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public reason: PostReportReason;

  @column()
  public reasonContext: string;

  @column()
  public outcome: PostReportOutcome;

  @column()
  public outcomeContext: string;

  @column()
  public postId: string;

  @belongsTo(() => Post)
  public post: BelongsTo<typeof Post>;

  @column()
  public reporterId: string;

  @belongsTo(() => User)
  public reporter: BelongsTo<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
