import { api } from "@config/axios";

export async function authenticateService(email: string, password: string) {
  return api.post("/auth/authenticate", { email, password });
}
