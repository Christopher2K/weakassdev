import Factory from '@ioc:Adonis/Lucid/Factory';

import Post from 'App/Models/Post';
import UserFactory from './UserFactory';

export default Factory.define(Post, ({ faker }) => {
  return {
    content: faker.lorem.paragraph(),
  };
})
  .relation('author', () => UserFactory)
  .build();
