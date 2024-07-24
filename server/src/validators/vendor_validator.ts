import { z } from "zod";
import VendorModel from "../models/VendorModal";

export const vendor_validator = z.object({
  name: z
    .string()
    .min(1, "name property is required")
    .max(100, "name property cannot go over 100char")
    .refine(async (v) => {
      const is_exist = await VendorModel.findOne({ name: v });
      return is_exist === null;
    }, "Name Cannot be Duplicated"),
})