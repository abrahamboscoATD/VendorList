import { FastifyReply, FastifyRequest } from "fastify";
import { invalid_return, valid_return } from "../utils/api_return.js";
import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
import { z } from "zod"; // Assuming zod is used for validation
const { JsonWebTokenError, sign, verify } = pkg;

// Define the register_validator schema
const register_validator = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
});

// Define types for request body
interface LoginRequestBody {
  username: string;
  password: string;
}

interface RegisterRequestBody {
  username: string;
  password: string;
  email: string;
}

export async function login_controller(request: FastifyRequest<{ Body: LoginRequestBody }>, reply: FastifyReply) {
  try {
    const { username, password } = request.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return invalid_return(null, "User not found", 404);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return invalid_return(null, "Invalid credentials", 401);
    }
    const token = sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
    return valid_return({ token });
  } catch (err) {
    return invalid_return(null, (err as Error).message, 500);
  }
}

export async function register_controller(request: FastifyRequest<{ Body: RegisterRequestBody }>, reply: FastifyReply) {
  try {
    const body = await register_validator.safeParseAsync(request.body);
    if (!body.success) {
      return invalid_return(body.error.formErrors.fieldErrors);
    }
    const { username, password, email } = body.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword, email });
    await newUser.save();
    return valid_return(newUser.toJSON(), "User registered successfully");
  } catch (err) {
    return invalid_return(null, (err as Error).message, 500);
  }
}

export async function verify_token_controller(request: FastifyRequest, reply: FastifyReply) {
  try {
    const auth_token = request.headers.authorization?.split(" ")[1];
    if (!auth_token) {
      return invalid_return(null, "No token provided", 401);
    }
    const dec = await verify(auth_token, process.env.JWT_SECRET as string);
    return valid_return(dec);
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      return invalid_return(null, "Invalid token", 401);
    }
    return invalid_return(null, (err as Error).message, 500);
  }
}

// Add any other controllers here...
