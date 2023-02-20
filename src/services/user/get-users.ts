import { api } from "@config/axios";
import { Result } from "@utils/createApiResponse";

export async function getUsersService() {
  return api.get<Result>("/users");
}
