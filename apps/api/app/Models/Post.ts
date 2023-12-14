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
import PostReport from './PostReport';
import ForbiddenUserActionException from 'App/Exceptions/ForbiddenUserActionException';

export default class Post extends BaseModel {
  public serializeExtras = true;

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

  @hasMany(() => PostReport, {
    foreignKey: 'postId',
  })
  public reports: HasMany<typeof PostReport>;

  // Properties
  public get canBeUpdated() {
    const limit = this.createdAt.plus({ minutes: 30 });
    const now = DateTime.now().toUTC();

    return now < limit;
  }

  public get canBeFlagged() {
    return this.status === postStatusSchema.Values.PUBLISHED;
  }

  public get canBeUnflagged() {
    return this.status === postStatusSchema.Values.FLAGGED;
  }

  // Actions
  public async flag() {
    if (!this.canBeFlagged)
      throw new ForbiddenUserActionException('Impossible de flagger ce post.');

    this.status = postStatusSchema.Values.FLAGGED;
    return this.save();
  }

  public async unflag() {
    if (!this.canBeUnflagged)
      throw new ForbiddenUserActionException('Impossible de rétablir ce post.');
    this.status = postStatusSchema.Values.PUBLISHED;
    return this.save();
  }
}
