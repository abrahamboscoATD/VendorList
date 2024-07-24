import { FastifyReply, FastifyRequest } from "fastify";
import { invalid_return, valid_return } from "../utils/api_return.js";
import VendorModel from "../models/VendorModal.js";
import { vendor_validator } from "../validators/vendor_validator.js";

// Define types for request parameters
interface VendorRequestParams {
    vendorId: string;
}

interface VendorRequest extends FastifyRequest {
    params: VendorRequestParams;
}

// Types for request and reply parameters
type Request = FastifyRequest;
type Reply = FastifyReply;

export async function get_all_vendor_controller(request: Request, reply: Reply) {
    try {
        const all_vendor = await VendorModel.find({});
        return valid_return(all_vendor);
    } catch (err) {
        return invalid_return(null, (err as Error).message, 500);
    }
}

export async function create_vendor_controller(request: Request, reply: Reply) {
    try {
        const body_data = await vendor_validator.safeParseAsync(request.body);
        if (!body_data.success)
            return invalid_return(body_data.error.formErrors.fieldErrors);
        const created_data = await new VendorModel({
            name: body_data.data.name,
        }).save();
        return valid_return(created_data.toJSON());
    } catch (err) {
        return invalid_return(null, (err as Error).message, 500);
    }
}

export async function update_vendor_controller(request: VendorRequest, reply: Reply) {
    try {
        const vendorId = request.params.vendorId || "";
        if (!vendorId)
            return invalid_return(null, "Please include vendor _id which you want to update");
        const body_data = await vendor_validator.safeParseAsync(request.body);
        if (!body_data.success) {
            return invalid_return(body_data.error.formErrors.fieldErrors);
        }
        const updated_vendor = await VendorModel.findByIdAndUpdate(vendorId, {
            $set: {
                name: body_data.data.name,
            },
        }, { new: true });
        return valid_return(updated_vendor?.toObject());
    } catch (err) {
        return invalid_return(null, (err as Error).message, 500);
    }
}

export async function delete_one_vendor_controller(request: VendorRequest, reply: Reply) {
    try {
        const { vendorId } = request.params;
        if (!vendorId)
            return invalid_return("", "Include vendor id in request param;");
        const deleted_vendor = await VendorModel.findByIdAndDelete(vendorId);
        return valid_return(deleted_vendor, "Deleted vendor");
    } catch (err) {
        return invalid_return(null, (err as Error).message, 500);
    }
}
