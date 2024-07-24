import { Mongoose, ObjectId, Schema, model } from "mongoose";

export interface IApplicatonsList {
  application: string;
  vendor: ObjectId;
  email: string;
  phone: string;
  support_level: "l1" | "l2" | "l3";
  added_by: ObjectId;
  full_name: string;
}

interface IApplicatonSchema extends Document, IApplicatonsList {}

const application_list_schema = new Schema<IApplicatonSchema>(
  {
    application: {
      type: String,
      required: true,
      minlength: [5, "Min 5 Character Required"],
      maxlength: [200, "Max 200 Character Limits"],
      trim: true,
    },
    vendor: {
      type: Schema.Types.ObjectId,
      ref: "Vendors",
      required: [true, "Vendor Must Be in the Database"],
    },
    email: {
      required: true,
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    full_name: {
      type: String,
      trim: true,
      default: "N/A",
    },
    support_level: {
      type: String,
      enum: {
        values: ["l1", "l2", "l3"],
        message: "L1, L2, L3 Support Only",
      },
    },
    added_by: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
  },
  { timestamps: true }
);

application_list_schema.index(
  { application: "text", email: "text", phone: "text" },
  {
    weights: {
      application: 5,
      email: 2,
      phone: 2,
    },
  }
);

const ApplicationListModel = model("Applications_List", application_list_schema);
export default ApplicationListModel;
