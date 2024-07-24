import { Document, Schema, model } from "mongoose";

interface IVendor {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IVendorSchema extends IVendor, Document {}

const vendorScema = new Schema<IVendorSchema>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Vendor Name cannot go over 100 characters"],
    },
  },
  {
    timestamps: true,
  }
);

const VendorModel = model<IVendorSchema>("Vendors", vendorScema);

export default VendorModel;
