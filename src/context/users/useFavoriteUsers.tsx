import { MouseEvent } from "react";
import { useAuthContext } from "@context/auth";
import { User } from "@data/entities/user";
import { updateUserUseCase } from "@data/useCases/user";

import useSWR from "swr";
import { getFavoritesUseCase } from "@data/useCases/favorite/getFavoritesUseCase";
import { createFavoriteUseCase } from "@data/useCases/favorite/createFavoriteUseCase";
import { Favorite } from "@data/entities/favorite";
import { uuid } from "@utils/uniqueId";

export function useFavoriteUsers() {
  const { user: currentUser } = useAuthContext();

  const { mutate, data } = useSWR(
    "/favorites",
    () =>
      getFavoritesUseCase(currentUser?.id as string).then(
        (response) => response
      ),
    { revalidateIfStale: false, revalidateOnFocus: false }
  );

  const favorites = data as Favorite[];

  const isEmpty = data?.length === 0;
  const isLoading = !data;

  function checkUserIsFavorited(userId: string) {
    return favorites?.find((favorite) => favorite.userId === userId);
  }

  async function favorite(
    event: MouseEvent<SVGSVGElement, globalThis.MouseEvent>,
    userId: string
  ) {
    event.stopPropagation();

    const previousFavorites = structuredClone(favorites);

    if (checkUserIsFavorited(userId)) {
      mutate(
        favorites.filter((favorite) => favorite.userId !== userId),
        false
      );
    } else {
      mutate([...favorites, { id: uuid(), userId }], false);
    }

    try {
      await createFavoriteUseCase(currentUser?.id as string, userId);
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
