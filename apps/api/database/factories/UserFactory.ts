import User from 'App/Models/User';
import Factory from '@ioc:Adonis/Lucid/Factory';

export default Factory.define(User, ({ faker }) => {
  return {
    username: faker.internet.userName().slice(0, 19),
    password: faker.internet.password(),
    email: faker.internet.email(),
  };
}).build();
