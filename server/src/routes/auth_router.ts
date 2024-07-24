import { FastifyInstance } from "fastify";
import { login_controller, register_controller, verify_token_controller } from "../controller/auth.js";

async function authRouter(fastify: FastifyInstance) {
  fastify.post("/login", login_controller);
  fastify.post("/register", register_controller);
  fastify.get("/verify-token", verify_token_controller);
}

export default authRouter;
