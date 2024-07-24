import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { create_vendor_controller, delete_one_vendor_controller, get_all_vendor_controller, update_vendor_controller } from "../controller/vendor";

export default function vendor_router(fastify: FastifyInstance, opt: FastifyPluginOptions, done: (err?: Error) => void) {
  fastify.get("/get-all", get_all_vendor_controller);
  fastify.post("/create-one", create_vendor_controller);
  fastify.put("/update-one/:vendorId", update_vendor_controller);
  fastify.delete("/delete-one/:vendorId", delete_one_vendor_controller);
  done();
}
