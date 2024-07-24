import { FastifyInstance } from "fastify";
import { create_vendor_controller, delete_one_vendor_controller, get_all_vendor_controller, update_vendor_controller } from "../controller/vendor.js";

async function vendorRouter(fastify: FastifyInstance) {
  fastify.get("/get-all", get_all_vendor_controller);

  fastify.post("/create-one", create_vendor_controller);

  fastify.put<{ Params: { vendorId: string } }>("/update-one/:vendorId", update_vendor_controller);

  fastify.delete<{ Params: { vendorId: string } }>("/delete-one/:vendorId", delete_one_vendor_controller);
}

export default vendorRouter;
