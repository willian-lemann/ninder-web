import { FavoriteDTO } from "@data/dtos/favorite";
import { User } from "@data/entities";
import { Favorite } from "@data/entities/favorite";

import { getFavoritesGateway } from "@data/gateways/favorite/getFavoritesGateway";
import { getUsersUseCase, getUserUseCase } from "../user";

export async function getFavoritesUseCase(currentUserId: string) {
  const docsFavorites = await getFavoritesGateway(currentUserId);

  const currentUser = await getUserUseCase(currentUserId);

  const response = await getUsersUseCase(currentUser as User);

  const { result: users } = response.data;

  const favorites = docsFavorites.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Favorite[];

  const teste: FavoriteDTO[] = [];

  users.forEach((user) => {
    const favorite = favorites.find((favorite) => favorite.userId);

    if (favorite) {
      teste.push({ id: favorite.id, user });
    }
  });

  return teste;
}
