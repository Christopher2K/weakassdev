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
      return query.distinctOn('post_id').orderBy([
        {
          column: 'post_id',
          order: 'desc',
        },
        {
          column: 'created_at',
          order: 'desc',
        },
      ]);
    },
  })
  public content: HasOne<typeof PostContent>;

  @hasMany(() => PostContent, {
    foreignKey: 'postId',
  })
  public postVersions: HasMany<typeof PostContent>;

  // Getter / Setter
  public get canBeUpdated() {
    const limit = this.createdAt.plus({ minutes: 30 });
    const now = DateTime.now().toUTC();

    return now < limit;
  }

  public serializeExtras() {
    return {
      revisions: +this.$extras.revisions,
    };
  }
}
