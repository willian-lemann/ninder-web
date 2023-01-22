import { api } from "@config/axios";

import { SignUpCredencials } from "@dtos/login/SignUpCredencials";

export async function signupService(data: SignUpCredencials) {
  return await api.post("/auth/register", data);
}
