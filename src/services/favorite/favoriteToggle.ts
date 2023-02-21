import { api } from "@config/axios";

export async function favoriteToggleService(userId: string) {
  return api.post("/favorites/toggle", { favoritedUserId: userId });
}
