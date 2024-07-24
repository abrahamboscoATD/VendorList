import jwt from "jsonwebtoken";

export function jwt_sign(paylod: any) {
  return new Promise((resolve, reject) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET not found in ENV variables");
    jwt.sign(paylod, secret, { expiresIn: "7d" }, function (err, token) {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
}

export function jwt_verify(token: string) {
  return new Promise((resolve, reject) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET not found in ENV variables");
    jwt.verify(token, secret, function (err, decoded) {
      if (err) reject(err);
      return resolve(decoded);
    });
  });
}
