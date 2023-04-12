import { memo, MouseEvent } from "react";
import Router from "next/router";

import { User } from "@/features/users/types/user";

import { HeartIcon as OutlinedHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as FilledHeartIcon } from "@heroicons/react/24/solid";

import { classNames } from "@/utils/classNames";

import { useFavorites } from "@/features/favorites/hooks/use-favorites";
import { formatAge } from "@/functions/formatAge";
import { Thumbnail } from "@/components/Thumbnail";

import { OpenChatPopover } from "./OpenChatPopover";

interface UserCardProps {
  user: User;
  toggleMap?: boolean;
}

export const UserCard = memo(({ user, toggleMap }: UserCardProps) => {
  const { toggle, checkUserIsFavorited } = useFavorites();

  const handleFavoriteToggle = async (
    event: MouseEvent<SVGSVGElement, globalThis.MouseEvent>,
    id?: string
  ) => {
    event.stopPropagation();

    if (!id) return;

    await toggle(id);
  };

  const handleSeeUserDetails = (id: string) => {
    Router.push(`/user/${id}`);
  };

  const isFavorite = checkUserIsFavorited(user.id as string);

  return (
    <li
      key={user.id}
      className={classNames(
        "h-[230px] w-[330px] flex flex-col cursor-pointer animate-fadeIn"
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
          {/* <OpenChatPopover user={user} /> */}

          {isFavorite ? (
            <FilledHeartIcon
              onClick={(event) => handleFavoriteToggle(event, user.id)}
              className="h-7 w-7 z-20 cursor-pointer text-primary animate-fadeIn"
            />
          ) : (
            <OutlinedHeartIcon
              onClick={(event) => handleFavoriteToggle(event, user.id)}
              className="h-7 w-7 cursor-pointer text-zinc-600 animate-fadeIn"
            />
          )}
        </div>
      </div>
    </li>
  );
});
