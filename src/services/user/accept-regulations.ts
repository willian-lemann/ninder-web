import { api } from "@config/axios";

export async function acceptRegulationsService() {
  return api.put("/accept-regulation");
}
