import { Favorite } from "@data/entities/favorite";
import { getFavoritesGateway } from "@data/gateways/favorite/getFavoritesGateway";

export async function getFavoritesUseCase(currentUserId: string) {
  const docsFavorites = await getFavoritesGateway(currentUserId);

  const favorites = docsFavorites.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Favorite[];

  return favorites;
}
