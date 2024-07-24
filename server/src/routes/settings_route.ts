import { FastifyInstance, FastifyPluginOptions } from "fastify";

export default function auth_router(fastify: FastifyInstance, opt: FastifyPluginOptions, done: (err?: Error) => void) {
  /*
    |-------> Profile Routes <---------|
  */

  fastify.put("/profile/update-user/:user_id");
  fastify.put("/profile/change-password/:user_id");

  /*
    |-------> USER Routes <---------|
  */
  fastify.get("/user/get-all");
  fastify.delete("/user/delete/:user_id");
  fastify.put("/user/change-role/:user_id");

  done();
}
