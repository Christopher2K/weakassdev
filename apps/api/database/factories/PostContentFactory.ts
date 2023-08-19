import Factory from '@ioc:Adonis/Lucid/Factory';

import PostContent from 'App/Models/PostContent';

import PostFactory from './PostFactory';
import UserPostContentReactionFactory from './UserPostContentReactionFactory';

export default Factory.define(PostContent, ({ faker }) => {
  return {
    content: faker.lorem.paragraph(),
  };
})
  .relation('post', () => PostFactory)
  .relation('reactions', () => UserPostContentReactionFactory)
  .build();
