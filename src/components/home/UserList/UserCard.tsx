import { memo, MouseEvent } from "react";
import Router from "next/router";

import { getDistanceBetweenTwoCoords } from "@utils/getDistanceBetweenTwoCoords";

import { formatAge, User } from "@models/user";

import { HeartIcon as OutlinedHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as FilledHeartIcon } from "@heroicons/react/24/solid";

import Image from "next/image";
import { useAuthContext } from "@context/auth";

import { classNames } from "@utils/classNames";
import { updateUserService } from "@services/user/updateUserService";

interface UserCardProps {
  user: User;
  toggleMap: boolean;
}

export const UserCard = memo(({ user, toggleMap }: UserCardProps) => {
  const { user: currentUser, setUser } = useAuthContext();

  const handleSeeUserDetails = (id: string) => {
    Router.push(`/user/${id}`);
  };

  const handleFavorite = async (
    event: MouseEvent<SVGSVGElement, globalThis.MouseEvent>,
    userId: string
  ) => {
    event.stopPropagation();

    const previousFavorites = currentUser?.favorites ?? [];

    const removedFavorites = previousFavorites.filter(
      (favoritedUser) => favoritedUser !== userId
    );

    if (currentUser?.favorites?.includes(userId)) {
      console.log("is favorite");
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
  };

  const distance = getDistanceBetweenTwoCoords({
    isMiles: false,
    currentLocation: currentUser?.location,
    targetLocation: user.location,
  });

  const isFavorite = currentUser?.favorites?.includes(user.id as string);

  return (
    <li
      key={user.id}
      className={classNames(
        toggleMap ? "w-[330px]" : "w-full",
        "h-[230px] flex flex-col cursor-pointer animate-fadeIn"
      )}
      onClick={() => handleSeeUserDetails(user.id as string)}
    >
      <div className="w-full h-full relative rounded-md">
        {isFavorite ? (
          <FilledHeartIcon
            onClick={(event) => handleFavorite(event, user.id as string)}
            className="h-8 w-8 z-20 absolute right-2 top-2 cursor-pointer text-primary"
          />
        ) : (
          <OutlinedHeartIcon
            onClick={(event) => handleFavorite(event, user.id as string)}
            className="h-8 w-8 z-20 absolute right-2 top-2 cursor-pointer text-zinc-200"
          />
        )}

        <Image
          className="rounded-md object-cover"
          src={user.avatar as string}
          alt="user avatar"
          fill
        />
      </div>

      <div className="mt-2">
        <div>
          <strong className="m-0">{user.name},</strong>
          <span>{formatAge(user.birthday)}</span>
        </div>

        <p className="m-0 text-sm leading-3 text-zinc-400">
          {distance} kilometers away
        </p>
      </div>
    </li>
  );
});
