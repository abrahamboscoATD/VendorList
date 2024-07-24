import { Date, Document, Schema, model } from "mongoose";
import crypto from "node:crypto";

export interface IUser {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_pic: string;
  user_token: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  role: "super_admin" | "admin" | "moderator" | "viwer";
}

interface IUserSchema extends IUser {}
const userSchema = new Schema<IUserSchema>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
      maxlength: 25,
    },
    password: String,
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    first_name: {
      type: String,
      default: "",
    },
    last_name: {
      type: String,
      default: "",
    },
    profile_pic: {
      type: String,
      default: "",
    },
    user_token: {
      type: String,
      uppercase: true,
      default: crypto.randomBytes(50).toString("hex").toUpperCase(),
    },
    role: {
      enum: ["super_admin", "admin", "moderator", "viwer"],
      type: String,
      default: "viwer",
    },
  },
  { timestamps: true }
);

const UserModel = model("Users", userSchema);
export default UserModel;
