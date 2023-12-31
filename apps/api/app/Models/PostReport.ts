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
  public reasonContext: string | null = null;

  @column()
  public outcome: PostReportOutcome | null;

  @column()
  public outcomeContext: string | null = null;

  @column()
  public postId: string;

  @belongsTo(() => Post, {
    foreignKey: 'postId',
  })
  public post: BelongsTo<typeof Post>;

  @column()
  public reporterId: string;

  @belongsTo(() => User, {
    foreignKey: 'reporterId',
  })
  public reporter: BelongsTo<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
