import { User as PrismaModelUser } from "@prisma/client";
import { exclude } from "@/utils/exclude";
import { User } from "../models/user";

export function createUser(user: PrismaModelUser) {
  const newUser = user;

  exclude(newUser, ["password"]);

  return {
    ...newUser,
  };
}
