import fastify from "fastify";
import "dotenv/config";
import logger from "./utils/logger.js";
import connectRoutes from "./routes/index.js";
import mongoose from "mongoose";
import { greenB, whiteB } from "./utils/text-colorize.js";
import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";

const server = fastify({});

const port = process.env.PORT || 8080;
const MONGOOSE_URI = process.env.DB_URL || "";

// Fastify Cors Plugin
server.register(fastifyCors);

// Cookie plugin
server.register(fastifyCookie, {
  secret: "my-secret",
  hook: "onRequest",
});

// Database Connection
mongoose
  .connect(MONGOOSE_URI)
  .then(() => {
    console.log(whiteB(greenB("Database connected successfully")));
  })
  .catch((e) => {
    console.log(e);
  });

// Adding HTTP Logger (ensure it doesn't use 'done' argument)
server.addHook("onResponse", async (request, reply) => {
  await logger(request, reply);
});

// Registering Routes as Plugin
connectRoutes(server);

// Root Route
server.get("/", async (request, reply) => {
  return reply.status(301).send("Hi, Don't worry I am working");
});

const start = async () => {
  try {
    await server.listen({
      port: Number(port),
      host: '0.0.0.0' // Ensure it binds to all interfaces
    });
    console.log("Server Started Successfully http://localhost:" + port);
  } catch (e) {
    server.log.error(e);
    process.exit(1);
  }
};
start();
