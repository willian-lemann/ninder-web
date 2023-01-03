import { createFavoriteGateway } from "@data/gateways/favorite/createFavoriteGateway";
import { getFavoriteUseCase } from "./getFavoriteUseCase";
import { removeFavoriteUseCase } from "./removeFavoriteUseCase";

export async function createFavoriteUseCase(
  currentUserId: string,
  userId: string
) {
  const favorite = await getFavoriteUseCase(currentUserId);

  if (favorite) {
    return await removeFavoriteUseCase(currentUserId);
  }

  return await createFavoriteGateway(currentUserId, userId);
}
