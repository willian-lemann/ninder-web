import { useAuth } from "@context/auth/useAuth";
import { useFavoriteUsers } from "@context/users/useFavoriteUsers";
import { formatAge } from "@functions/formatAge";

import { BookmarkIcon } from "@heroicons/react/24/solid";
import { getDistanceAway } from "@utils/getDistanceAway";
import Image from "next/image";
import { Avatar } from "./Header/Avatar";

export function Favorites() {
  const { user: currentUser } = useAuth();

  const { favorites, favoriteToggle, isEmpty } = useFavoriteUsers();

  {
    console.log("favorites", favorites);
  }

  return (
    <div className="container">
      <header className="py-8">
        <h1 className="text-black font-bold text-2xl">Favorites</h1>
      </header>

      <ul>
        {isEmpty ? (
          <h3 className="text-sm text-black/70">Bookmark users by tapping the top right save icon.</h3>
        ) : (
          favorites.map(({ id, user }) => (
            <li key={id} className="flex items-center">
              <Avatar avatar={user.avatar as string} />

              <div className="grid grid-cols-2 pl-2">
                <div>
                  <strong>
                    {user.name},
                    {user.birthday ? (
                      <span>{formatAge(user.birthday)}</span>
                    ) : null}
                  </strong>

                  <p className="text-black/80">
                    {getDistanceAway({
                      sourceLocation: {
                        latitude: Number(currentUser?.latitude),
                        longitude: Number(currentUser?.longitude),
                      },
                      targetLocation: {
                        latitude: Number(user.latitude),
                        longitude: Number(user.longitude),
                      },
                    })}
                    <span> Kilometers away </span>
                  </p>
                </div>

                <BookmarkIcon
                  className="h-6 w-6 justify-self-end"
                  onClick={() => favoriteToggle(user)}
                />
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
