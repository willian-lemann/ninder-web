import { api } from "@config/axios";

export async function acceptRegulationsService() {
  return api.post("/accept-regulation");
}
