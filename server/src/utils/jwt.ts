import pkg from "jsonwebtoken";
const { sign, verify, JsonWebTokenError } = pkg;

export function jwt_sign(payload: any, secret: string, options?: pkg.SignOptions) {
  return sign(payload, secret, options);
}

export function jwt_verify(token: string, secret: string, options?: pkg.VerifyOptions) {
  return verify(token, secret, options);
}
