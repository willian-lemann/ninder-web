import { Favorite } from "@data/entities/favorite";
import { getFavoriteGateway } from "@data/gateways/favorite/getFavoriteGateway";

export async function getFavoriteUseCase(id: string) {
  const doc = await getFavoriteGateway(id);

  if (!doc.exists()) {
    return null;
  }
  const favorite = { ...doc.data(), id: doc.id } as Favorite;

  return favorite;
}
