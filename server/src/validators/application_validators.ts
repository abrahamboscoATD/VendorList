import { isValidObjectId } from "mongoose";
import { z } from "zod";

export const application_validator = z.object({
  application: z.string().min(5, "Application should be atleast 5 char").max(200, "Application name cannot be over 200 chars"),
  vendor: z.string().refine((v) => isValidObjectId(v), "Vendor Should be a valid ObjectId"),
  added_by: z.string().refine((v) => isValidObjectId(v), "Vendor Should be a valid ObjectId"),
  email: z.string().email("Send a Valid Email").toLowerCase(),
  phone: z.string().toLowerCase(),
  support_level: z.enum(["l1", "l2", "l3"], {
    invalid_type_error: "Should be one from l1,l2,l3",
    required_error: "Support level is requride",
  }),
  full_name: z.string().min(1, "Full Name Cannot Be Empty").optional(),
});
