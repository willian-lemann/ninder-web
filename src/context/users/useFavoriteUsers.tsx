import { MouseEvent } from "react";
import { useAuthContext } from "@context/auth";
import { User } from "@data/entities/user";
import { updateUserUseCase } from "@data/useCases/user";

import useSWR from "swr";
import { getFavoritesUseCase } from "@data/useCases/favorite/getFavoritesUseCase";
import { createFavoriteUseCase } from "@data/useCases/favorite/createFavoriteUseCase";
import { Favorite } from "@data/entities/favorite";
import { uuid } from "@utils/uniqueId";
import { FavoriteDTO } from "@data/dtos/favorite";

export function useFavoriteUsers() {
  const { user: currentUser } = useAuthContext();

  const { mutate, data } = useSWR(
    `/favorites/${currentUser?.id}`,
    () =>
      getFavoritesUseCase(currentUser?.id as string).then(
        (response) => response
      ),
    { revalidateIfStale: false, revalidateOnFocus: false }
  );

  const favorites = data as FavoriteDTO[];

  const isEmpty = data?.length === 0;
  const isLoading = !data;

  function checkUserIsFavorited(userId: string) {
    return favorites?.find((favorite) => favorite.user.id === userId);
  }

  async function favorite(
    event: MouseEvent<SVGSVGElement, globalThis.MouseEvent>,
    user: User
  ) {
    event.stopPropagation();

    const previousFavorites = structuredClone(favorites);

    if (checkUserIsFavorited(user.id as string)) {
      mutate(
        favorites.filter((favorite) => favorite.user.id !== user.id),
        false
      );
    } else {
      mutate([...favorites, { id: uuid(), user }], false);
    }

    try {
      await createFavoriteUseCase(currentUser?.id as string, user.id as string);
    } catch (error) {
      mutate(previousFavorites, false);
    }
  }

  return {
    isLoading,
    isEmpty,
    favorites,
    favorite,
    checkUserIsFavorited,
  };
}
