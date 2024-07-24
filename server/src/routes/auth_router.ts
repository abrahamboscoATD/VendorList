import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { login_controller, register_controller, verify_session_controller } from "../controller/auth";

export default function auth_router(fastify: FastifyInstance, opt: FastifyPluginOptions, done: (err?: Error) => void) {
  fastify.post("/login", login_controller);
  fastify.post("/register", register_controller);
  fastify.get("/verify-session", verify_session_controller);
  done();
}
