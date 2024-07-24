import { FastifyReply, FastifyRequest } from "fastify";
import { login_validator, register_validator } from "../validators/auth_validators";
import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";
import { invalid_return, valid_return } from "../utils/api_return";
import { jwt_sign, jwt_verify } from "../utils/jwt";
import { JsonWebTokenError } from "jsonwebtoken";

export async function login_controller(req: FastifyRequest, rep: FastifyReply) {
  try {
    const body = await login_validator.safeParseAsync(req.body);
    console.log(req.body);
    if (!body.success) {
      return valid_return(body.error.formErrors);
    }

    const found_user = await UserModel.findOne({ username: body.data.username });

    if (!found_user) return invalid_return(null, "Invalid Username or Password");

    const valid_password = await bcrypt.compare(body.data.password, found_user.password);
    if (!valid_password) return invalid_return(null, "Invalid Username or Password");

    found_user.password = "";
    const user_data = found_user.toJSON();

    const token = await jwt_sign(user_data);
    return valid_return({ user: found_user.toObject(), token: token });
  } catch (error) {
    console.log(error);
  }
}

export async function register_controller(req: FastifyRequest, rep: FastifyReply) {
  try {
    const body = await register_validator.safeParseAsync(req.body);

    if (!body.success) {
      return invalid_return(body.error.format());
    }

    const hashed_password = await bcrypt.hash(body.data.password, 10);

    const createdUser = await new UserModel({
      username: body.data.username,
      password: hashed_password,
      email: body.data.email,
    }).save();

    return valid_return(createdUser);
  } catch (err) {
    console.log(err);
  }
}

export async function verify_session_controller(req: FastifyRequest, rep: FastifyReply) {
  try {
    const bearer_auth = req.headers.authorization;

    //if Invalid Format;
    if (!bearer_auth?.startsWith("Bearer")) return invalid_return(null, "Invalid Authorization header");

    const auth_token = bearer_auth.replace("Bearer ", "");

    if (!auth_token) return invalid_return(null, "Invalid Token. failed to login");
    const dec = await jwt_verify(auth_token);

    return valid_return(dec, "Successfully Verified");
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      return invalid_return(null, "Invalide JWt Token", 403);
    }
    return invalid_return(null, "Internal Server Error", 500);
  }
}
