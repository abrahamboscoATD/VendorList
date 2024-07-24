import { FastifyReply, FastifyRequest } from "fastify";
import { invalid_return, valid_reply, valid_return } from "../utils/api_return";
import VendorModel from "../models/VendorModal";
import ApplicationListModel from "../models/ApplicationModel";

export async function dashboard_stats_controller(req: FastifyRequest, reply: FastifyReply) {
  try {
    const total_vendors = await VendorModel.countDocuments();
    const total_applications = await ApplicationListModel.countDocuments();

    return valid_return({ total_applications, total_vendors });
  } catch (err) {
    return invalid_return(null, (err as Error).message, 500);
  }
}
