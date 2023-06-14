import jwt from "jsonwebtoken";

export type DecodedUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  iat: number;
  exp: number;
};

export function encodeToken(payload: any) {
  return jwt.sign(payload, process.env.JWT_SIGNING_KEY ?? "", {
    expiresIn: "24h",
  });
}

export function decodeToken(token: string): DecodedUser {
  return jwt.verify(token, process.env.JWT_SIGNING_KEY ?? "") as DecodedUser;
}
