import { api } from "@config/axios";
import { User } from "@data/models/user";
import { Result } from "@utils/createApiResponse";

export async function authenticateService(email: string, password: string) {
  const response = await api.post("/auth/login", { email, password });
  return response.data as Result<{ token: string; user: User }>;
}
