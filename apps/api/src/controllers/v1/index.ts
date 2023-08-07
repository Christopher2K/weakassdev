import { FastifyPluginAsync } from 'fastify';

import { AuthController } from './auth';

export const V1: FastifyPluginAsync = async (fastify) => {
  fastify.register(AuthController, { prefix: '/auth' });
};
