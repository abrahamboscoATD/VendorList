import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { dashboard_stats_controller } from "../controller/dashboard";

export default function dashboard_router(fastify: FastifyInstance, opt: FastifyPluginOptions, done: (err?: Error) => void) {
  fastify.get("/stats", dashboard_stats_controller);
  done();
}
