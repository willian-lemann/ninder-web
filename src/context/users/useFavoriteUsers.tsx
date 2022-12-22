import { useAuthContext } from "@context/auth";
import { User } from "@models/user";
import { updateUserService } from "@services/user/updateUserService";
import { MouseEvent } from "react";
import { useUsers } from "./useUsers";

export function useFavoriteUsers() {
  const { user: currentUser, setUser } = useAuthContext();
  const { users: favorites } = useUsers();

  const favoriteUsers = currentUser?.favorites?.map((favoriteUser) => {
    const mappedFavoriteUser = favorites.find(
      (favorite) => favorite.id === favoriteUser
    ) as User;

    return mappedFavoriteUser;
  });

  const isEmpty = favoriteUsers?.length === 0;

  function checkUserIsFavorited(userId: string) {
    return currentUser?.favorites?.includes(userId as string);
  }

  async function favorite(
    event: MouseEvent<SVGSVGElement, globalThis.MouseEvent>,
    userId: string
  ) {
    event.stopPropagation();

    const previousFavorites = currentUser?.favorites ?? [];

    const removedFavorites = previousFavorites.filter(
      (favoritedUser) => favoritedUser !== userId
    );

    if (currentUser?.favorites?.includes(userId)) {
      setUser((state) => ({
        ...(state as User),
        favorites: removedFavorites,
      }));

      try {
        await updateUserService(currentUser?.id as string, {
          favorites: removedFavorites,
        });
      } catch (error) {
        setUser((state) => ({
          ...(state as User),
          favorites: previousFavorites,
        }));
      }

      return;
    }

    const newFavorites = [...previousFavorites, userId];

    setUser((state) => ({ ...(state as User), favorites: newFavorites }));

    try {
      await updateUserService(currentUser?.id as string, {
        favorites: newFavorites,
      });
    } catch (error) {
      setUser((state) => ({
        ...(state as User),
        favorites: previousFavorites,
      }));
    }
  }

  return {
    isEmpty,
    favoriteUsers,
    favorite,
    checkUserIsFavorited,
  };
}
