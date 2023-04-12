import { api } from "@/utils/api";
import { create } from "@/config/store";
import { Favorite } from "../types/favorite";
import { uuid } from "@/utils/uniqueId";

export const favoritesStore = create<{
  favorites: Favorite[];
  setFavorites: (favorites: Favorite[]) => void;
}>()((set) => ({
  favorites: [],
  setFavorites: (favorites) => {
    set({ favorites });
  },
}));

export function useFavorites() {
  const { setFavorites, favorites } = favoritesStore((state) => state);
  const { data } = api.favorites.getAll.useQuery(undefined, {
    onSuccess: (newFavorites) => {
      setFavorites(newFavorites);
    },
  });

  const toggleMutation = api.favorites.toggle.useMutation();

  function checkUserIsFavorited(id: string) {
    const favorite = favorites?.find((favorite) => favorite.user.id === id);
    return !!favorite;
  }

  async function toggle(favoritedUserId: string) {
    const favoritedUser = favorites.find(
      (favoriteItem) => favoriteItem.user.id === favoritedUserId
    );

    if (favoritedUser) {
      setFavorites(
        favorites.filter(
          (favoriteItem) => favoriteItem.user.id !== favoritedUserId
        )
      );
    } else {
      const newFavorites = [
        ...favorites,
        { id: uuid, user: { id: favoritedUserId } },
      ] as Favorite[];

      setFavorites(newFavorites);
    }

    toggleMutation.mutate({ favoritedUserId });
  }

  return {
    favorites: !favorites ? [] : favorites,
    isEmpty: data?.length === 0,
    isLoading: !data,
    toggle,
    checkUserIsFavorited,
  };
}
