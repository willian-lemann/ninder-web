import { SignOptions } from "jsonwebtoken";

export const SECRET = process.env.NEXT_PUBLIC_JWT_SECRET as string;

export const JWT_OPTIONS: SignOptions = { expiresIn: "1d" };
