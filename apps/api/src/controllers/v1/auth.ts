import { FastifyPluginAsync } from 'fastify';

export const AuthController: FastifyPluginAsync = async (fastify) => {
  fastify.get('/login', async function handler() {
    return { hello: 'world' };
  });
};
