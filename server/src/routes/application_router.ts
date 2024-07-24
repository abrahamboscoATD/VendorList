import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { add_one_application_controller, get_all_application_list_controller } from "../controller/application";

export default function application_router(fastify: FastifyInstance, opt: FastifyPluginOptions, done: (err?: Error) => void) {
  fastify.post("/add-one", add_one_application_controller);
  fastify.get("/get-all", get_all_application_list_controller);
  done();
}
