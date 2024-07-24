import { z } from "zod";
import UserModel from "../models/UserModel";

export const register_validator = z
  .object({
    username: z.string().min(5, "username should be at least 5 characters").max(25, "username cannot go over 25 characters").toLowerCase(),
    email: z
      .string()
      .min(1, "email cannot be empty")
      .email("email should be an valid email")
      .toLowerCase()
      .refine(
        async (v) => {
          const foundUser = await UserModel.findOne({ email: v });
          return foundUser === null;
        },
        { message: "email already exists" }
      ),
    password: z.string().min(8, "Password needs to be at least 8 character"),
    confirm_password: z.string().min(8, "Password needs to be at least 8 character"),
  })
  .refine(
    (data) => {
      return data.password === data.confirm_password;
    },
    {
      message: "Password doesn't Match",
      path: ["confirm_password"],
    }
  );

export const login_validator = z.object({
  username: z.string().min(5, "username should be at least 5 characters").max(25, "username cannot go over 25 characters").toLowerCase(),
  password: z.string().min(8, "Password needs to be at least 8 characters"),
});
