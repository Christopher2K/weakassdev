import Post from 'App/Models/Post';
import Factory from '@ioc:Adonis/Lucid/Factory';

export default Factory.define(Post, ({ faker }) => {
  return {
    content: faker.lorem.paragraph(),
  };
}).build();
