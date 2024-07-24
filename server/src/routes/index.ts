import { FastifyInstance } from "fastify";
import auth_router from "./auth_router.js";
import vendor_router from "./vendor_router.js";
import application_router from "./application_router.js";
import dashboard_router from "./dashboard_router.js";

const routes = [
  {
    path: "/auth",
    router: auth_router,
  },
  {
    path: "/vendor",
    router: vendor_router,
  },
  {
    path: "/application-list",
    router: application_router,
  },
  {
    path: "/dashboard",
    router: dashboard_router,
  },
];

export default function connectRoutes(fastify: FastifyInstance) {
  try {
    for (const route of routes) {
      fastify.register(route.router, { prefix: "/api" + route.path });
    }
  } catch (e) {}
}
