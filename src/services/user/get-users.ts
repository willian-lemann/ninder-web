import { api } from "@config/axios";
import { User } from "@prisma/client";
import { Result } from "@utils/createApiResponse";

export async function getUsersService() {
  return api.get<Result<User[]>>("/users");
}
