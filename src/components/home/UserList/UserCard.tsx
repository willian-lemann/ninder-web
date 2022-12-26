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

interface UserCardProps {
  user: User;
  toggleMap: boolean;
}

export const UserCard = memo(({ user, toggleMap }: UserCardProps) => {
  const { user: currentUser } = useAuthContext();
  const { favorite } = useFavoriteUsers();

  const handleSeeUserDetails = (id: string) => {
    Router.push(`/user/${id}`);
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
        <Image
          className="rounded-md object-cover"
          src={user.avatar as string}
          alt="user avatar"
          fill
        />
      </div>

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
            onClick={(event) => favorite(event, user.id as string)}
            className="h-8 w-8 z-20 cursor-pointer text-primary animate-fadeIn"
          />
        ) : (
          <OutlinedHeartIcon
            onClick={(event) => favorite(event, user.id as string)}
            className="h-8 w-8 z-20 cursor-pointer text-zinc-600 animate-fadeIn"
          />
        )}
      </div>
    </li>
  );
});
