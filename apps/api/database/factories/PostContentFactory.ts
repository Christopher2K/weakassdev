import { DateTime } from 'luxon';

import Factory from '@ioc:Adonis/Lucid/Factory';

import PostContent from 'App/Models/PostContent';

import PostFactory from './PostFactory';
import UserPostContentReactionFactory from './UserPostContentReactionFactory';

export default Factory.define(PostContent, ({ faker }) => {
  const date = DateTime.fromJSDate(faker.date.past());

  return {
    content: faker.lorem.paragraph(),
    createdAt: date,
    updatedAt: date,
  };
})
  .relation('post', () => PostFactory)
  .relation('reactions', () => UserPostContentReactionFactory)
  .build();
