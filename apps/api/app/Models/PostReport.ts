import { DateTime } from 'luxon';
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm';

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

  @hasOne(() => Post, {
    foreignKey: 'post_id',
  })
  public post: HasOne<typeof Post>;

  @hasOne(() => User, {
    foreignKey: 'reporter_id',
  })
  public reporter: HasOne<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
