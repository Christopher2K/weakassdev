import Factory from '@ioc:Adonis/Lucid/Factory';

import UserPostContentReaction from 'App/Models/UserPostContentReaction';

import UserFactory from './UserFactory';
import PostContentFactory from './PostContentFactory';

export default Factory.define(UserPostContentReaction, ({ faker }) => {
  return {
    reaction: faker.helpers.arrayElement(['UP', 'DOWN', 'LOVE']),
  };
})
  .relation('postContent', () => PostContentFactory)
  .relation('user', () => UserFactory)
  .build();
