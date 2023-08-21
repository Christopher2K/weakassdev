import Factory from '@ioc:Adonis/Lucid/Factory';

import User from 'App/Models/User';

import PostFactory from './PostFactory';

export default Factory.define(User, ({ faker }) => {
  return {
    username: faker.internet.userName().slice(0, 15) + (Math.floor(Math.random() * 9999) + 1),
    password: faker.internet.password(),
    email: faker.internet.email(),
  };
})
  .relation('posts', () => PostFactory)
  .build();
