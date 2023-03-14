import { memo, MouseEvent } from "react";
import Router from "next/router";

import { User } from "@data/models/user";

import { HeartIcon as OutlinedHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as FilledHeartIcon } from "@heroicons/react/24/solid";

import { classNames } from "@utils/classNames";

import { useFavoriteUsers } from "@context/users/useFavoriteUsers";
import { formatAge } from "@functions/formatAge";
import { Thumbnail } from "@components/Thumbnail";
import { useChatsContext } from "@context/chat";

import { Chat } from "@data/models/chat";
import { uuid } from "@utils/uniqueId";
import { OpenChatPopover } from "./OpenChatPopover";

interface UserCardProps {
  user: User;
  toggleMap?: boolean;
}

export const UserCard = memo(({ user, toggleMap }: UserCardProps) => {
  const { favoriteToggle, checkUserIsFavorited } = useFavoriteUsers();

  const handleFavoriteToggle = async (
    event: MouseEvent<SVGSVGElement, globalThis.MouseEvent>,
    user: User
  ) => {
    event.stopPropagation();

    await favoriteToggle(user);
  };

  const handleSeeUserDetails = (id: string) => {
    Router.push(`/user/${id}`);
  };

  const isFavorite = checkUserIsFavorited(user.id as string);

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
            {user.distanceAway} kilometers away
          </p>
        </div>

        <div className="flex items-center gap-2">
          <OpenChatPopover user={user} />

          {isFavorite ? (
            <FilledHeartIcon
              onClick={(event) => handleFavoriteToggle(event, user)}
              className="h-7 w-7 z-20 cursor-pointer text-primary animate-fadeIn"
            />
          ) : (
            <OutlinedHeartIcon
              onClick={(event) => handleFavoriteToggle(event, user)}
              className="h-7 w-7 cursor-pointer text-zinc-600 animate-fadeIn"
            />
          )}
        </div>
      </div>
    </li>
  );
});
