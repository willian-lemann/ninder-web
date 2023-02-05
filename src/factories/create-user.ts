import { User } from "@prisma/client";
import { User as UserR } from "../models/user";

export function createUser(user: User) {
  const createdUser: UserR = { ...user };
  return {
    ...createdUser,
  };
}
