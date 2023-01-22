import { useAuthContext } from "@context/auth";
import { User } from "@data/models/user";

import useSWR from "swr";

export function useFavoriteUsers() {
  const { user: currentUser } = useAuthContext();

  const { mutate, data } = useSWR(`/favorites/${currentUser?.id}`, () => {}, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  function checkUserIsFavorited(userId: string) {}

  async function favorite(user: User) {}

  return {
    favorite,
    checkUserIsFavorited,
  };
}
