import Factory from '@ioc:Adonis/Lucid/Factory';

import User from 'App/Models/User';
import { generateRandomNumber } from 'App/Utils/seederUtils';

import PostFactory from './PostFactory';

export default Factory.define(User, ({ faker }) => {
  const userFactoryEmail = generateRandomNumber({ min: 1, max: 9999 }) + faker.internet.email();
  const userFactoryUsername =
    faker.internet.userName().slice(0, 15) + generateRandomNumber({ min: 1, max: 9999 });

  return {
    username: userFactoryUsername,
    email: userFactoryEmail,
    password: faker.internet.password(),
  };
})
  .relation('posts', () => PostFactory)
  .build();
