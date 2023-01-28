import { api } from "@config/axios";
import { ToggleFavoriteDto } from "@dtos/favorite/toggle-favorite-dto";

export async function favoriteToggleService(userId: string) {
  return api.post("/favorites/toggle", { favoritedUserId: userId });
}
