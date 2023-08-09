import { DateTime } from 'luxon';
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm';

import { PostStatus } from '@weakassdev/shared/models';

import User from 'App/Models/User';

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public content: string;

  @column()
  public status: PostStatus;

  @hasOne(() => User, {
    foreignKey: 'authorId',
  })
  public author: HasOne<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
