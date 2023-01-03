import { memo } from "react";
import Router from "next/router";

import { getDistanceBetweenTwoCoords } from "@utils/getDistanceBetweenTwoCoords";

import { User } from "@data/entities/user";

import { HeartIcon as OutlinedHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as FilledHeartIcon } from "@heroicons/react/24/solid";

import Image from "next/image";
import { useAuthContext } from "@context/auth";

import { classNames } from "@utils/classNames";

import { useFavoriteUsers } from "@context/users/useFavoriteUsers";
import { formatAge } from "@functions/formatAge";
import { Thumbnail } from "@components/Thumbnail";

interface UserCardProps {
  user: User;
  toggleMap: boolean;
}

export const UserCard = memo(({ user, toggleMap }: UserCardProps) => {
  const { user: currentUser } = useAuthContext();
  const { favorite, favorites, checkUserIsFavorited } = useFavoriteUsers();

  const handlefavorite = async (event: any, userId: string) => {
    await favorite(event, user.id as string);
  };

  const handleSeeUserDetails = (id: string) => {
    Router.push(`/user/${id}`);
  };

  const distance = getDistanceBetweenTwoCoords({
    isMiles: false,
    sourceLocation: currentUser?.location,
    targetLocation: user.location,
  });

  console.log(favorites);
  const isFavorite = checkUserIsFavorited(user.id);

  return (
    <li
      key={user.id}
      className={classNames(
        toggleMap ? "w-[330px]" : "w-full",
        "h-[230px] flex flex-col cursor-pointer animate-fadeIn"
      )}
      onClick={() => handleSeeUserDetails(user.id as string)}
    >
      <Thumbnail image={user.avatar as string} />

      <div className="mt-2 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div>
            <strong className="m-0">{user.name},</strong>
            <span>{formatAge(user.birthday)}</span>
          </div>

          <p className="m-0 text-sm leading-3 text-zinc-400">
            {distance} kilometers away
          </p>
        </div>

        {isFavorite ? (
          <FilledHeartIcon
            onClick={(event) => handlefavorite(event, user.id as string)}
            className="h-8 w-8 z-20 cursor-pointer text-primary animate-fadeIn"
          />
        ) : (
          <OutlinedHeartIcon
            onClick={(event) => handlefavorite(event, user.id as string)}
            className="h-8 w-8 z-20 cursor-pointer text-zinc-600 animate-fadeIn"
          />
        )}
      </div>
    </li>
  );
});
