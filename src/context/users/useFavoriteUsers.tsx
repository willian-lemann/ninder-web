import { addErrorNotification } from "@components/shared/alert";
import { api } from "@config/axios";
import { useAuthContext } from "@context/auth";
import { Favorite } from "@data/models/favorite";
import { User } from "@data/models/user";
import { favoriteToggleService } from "@services/favorite/favoriteToggle";
import { uuid } from "@utils/uniqueId";

import useSWR from "swr";

const fetcher = (url: string) => api.get(url).then((res) => res.data.result);

export function useFavoriteUsers() {
  const {
    mutate,
    data = [],
    isLoading,
  } = useSWR<Favorite[]>(`/favorites`, fetcher);

  const favorites = data as Favorite[];
  const isEmpty = favorites?.length === 0;

  function checkUserIsFavorited(userId: string) {
    const favorite = favorites?.find((favorite) => favorite.user.id === userId);
    return !!favorite;
  }

  async function favoriteToggle(user: User) {
    const previousFavorites = structuredClone(favorites);

    const hasFavorite = favorites?.find(
      (favorite) => favorite.user.id === user.id
    );

    if (!hasFavorite) {
      mutate(
        [
          ...favorites,
          {
            id: uuid(),
            user: {
              id: user.id as string,
              avatar: user.avatar as string,
              name: user.name as string,
            },
          },
        ],
        false
      );
    } else {
      const newFavorites = favorites.filter(
        (favorite) => favorite.user.id !== user.id
      );

      mutate(newFavorites, false);
    }

    try {
      const response = await favoriteToggleService(user.id as string);

      const { result, error, success } = response.data;

      if (!success) {
        return addErrorNotification(error.message);
      }
    } catch (error) {
      addErrorNotification(`Error trying to favorite ${user.name}`);
      mutate(previousFavorites, false);
    }
  }

  return {
    mutate,
    isEmpty,
    isLoading,
    favorites,
    favoriteToggle,
    checkUserIsFavorited,
  };
}
