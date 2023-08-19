import Factory from '@ioc:Adonis/Lucid/Factory';

import { postReportReasonSchema } from '@weakassdev/shared/models';

import PostReport from 'App/Models/PostReport';

import UserFactory from './UserFactory';
import PostFactory from './PostFactory';

export default Factory.define(PostReport, async ({ faker }) => {
  return {
    reason: postReportReasonSchema.Values.OFFENSIVE,
    reasonContext: faker.lorem.text(),
  };
})
  .relation('reporter', () => UserFactory)
  .relation('post', () => PostFactory)
  .build();
