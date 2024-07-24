import { FastifyInstance, FastifyPluginOptions } from "fastify";

export default function auth_router(fastify: FastifyInstance, opt: FastifyPluginOptions, done: (err?: Error) => void) {
  /*
    |-------> Profile Routes <---------|
  */

  fastify.put("/profile/update-user/:user_id", async (request, reply) => {
    // Add your handler logic here
    reply.send({ status: 'User profile updated' });
  });

  fastify.put("/profile/change-password/:user_id", async (request, reply) => {
    // Add your handler logic here
    reply.send({ status: 'Password changed' });
  });

  /*
    |-------> USER Routes <---------|
  */
  
  fastify.get("/user/get-all", async (request, reply) => {
    // Add your handler logic here
    reply.send({ users: [] });
  });

  fastify.delete("/user/delete/:user_id", async (request, reply) => {
    // Add your handler logic here
    reply.send({ status: 'User deleted' });
  });

  fastify.put("/user/change-role/:user_id", async (request, reply) => {
    // Add your handler logic here
    reply.send({ status: 'User role changed' });
  });

  done();
}
