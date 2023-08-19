import Factory from '@ioc:Adonis/Lucid/Factory';

import Post from 'App/Models/Post';

import UserFactory from './UserFactory';
import PostContentFactory from './PostContentFactory';

export default Factory.define(Post, () => {
  return {};
})
  .relation('author', () => UserFactory)
  .relation('content', () => PostContentFactory)
  .relation('postVersions', () => PostContentFactory)
  .build();
