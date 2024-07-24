import { FastifyReply, FastifyRequest } from "fastify";
import { invalid_return, valid_reply, valid_return } from "../utils/api_return";
import { z } from "zod";
import VendorModel from "../models/VendorModal";
import { vendor_validator } from "../validators/vendor_validator";

export async function get_all_vendor_controller(request: FastifyRequest, reply: FastifyReply) {
  try {
    const all_vendor = await VendorModel.find({});
    return valid_return(all_vendor);
    return;
  } catch (err) {
    return invalid_return(null, (err as Error).message, 500);
  }
}

export async function create_vendor_controller(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body_data = await vendor_validator.safeParseAsync(request.body);

    if (!body_data.success) return invalid_return(body_data.error.formErrors.fieldErrors);

    const created_data = await new VendorModel({
      name: body_data.data.name,
    }).save();

    return valid_return(created_data.toJSON());
  } catch (err) {
    return invalid_return(null, (err as Error).message, 500);
  }
}

export async function update_vendor_controller(request: FastifyRequest, reply: FastifyReply) {
  try {
    const vendorId = (request.params as any).vendorId || "";
    if (!vendorId) return invalid_return(null, "Please include vendor _id which you want to update");

    const body_data = await vendor_validator.safeParseAsync(request.body);
    if (!body_data.success) {
      return invalid_return(body_data.error.formErrors.fieldErrors);
    }

    const updated_vendor = await VendorModel.findByIdAndUpdate(
      vendorId,
      {
        $set: {
          name: body_data.data.name,
        },
      },
      { new: true }
    );

    return valid_return(updated_vendor?.toObject());
  } catch (err) {
    return invalid_return(null, (err as Error).message, 500);
  }
}

export async function delete_one_vendor_controller(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { vendorId } = req.params as any;
    if (!vendorId) return invalid_return("", "Include vendor id in request param;");

    const deleted_vendor = await VendorModel.findByIdAndDelete(vendorId);
    return valid_return(deleted_vendor, "Deleted vendor");
  } catch (err) {
    return invalid_return(null, (err as Error).message, 500);
  }
}
