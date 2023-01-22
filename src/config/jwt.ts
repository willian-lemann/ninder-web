import { SignOptions } from "jsonwebtoken";

export const JWT_SECRET = process.env.JWT_SECRET as string;

export const signOptions: SignOptions = {
  expiresIn: "1d",
};
