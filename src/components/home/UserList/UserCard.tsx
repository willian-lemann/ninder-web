import { memo, MouseEvent, use } from "react";
import Router from "next/router";

import { User } from "@data/models/user";

import {
  ChatBubbleLeftEllipsisIcon as ChatIcon,
  HeartIcon as OutlinedHeartIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as FilledHeartIcon } from "@heroicons/react/24/solid";

import Image from "next/image";
import { useAuthContext } from "@context/auth";

import { classNames } from "@utils/classNames";

import { useFavoriteUsers } from "@context/users/useFavoriteUsers";
import { formatAge } from "@functions/formatAge";
import { Thumbnail } from "@components/Thumbnail";
import { useChatsContext } from "@context/chat";
import { useUserChats } from "@context/chat/useUserChats";
import { Chat } from "@data/models/chat";

interface UserCardProps {
  user: User;
  toggleMap: boolean;
}

export const UserCard = memo(({ user, toggleMap }: UserCardProps) => {
  const { user: currentUser } = useAuthContext();
  const { startNewChat } = useChatsContext();
  const { favoriteToggle, checkUserIsFavorited } = useFavoriteUsers();

  const handleStartChat = (
    event: MouseEvent<SVGSVGElement, globalThis.MouseEvent>,
    user: User
  ) => {
    event.stopPropagation();

    const chat = {
      user: {
        id: user.id,
        avatar: user.avatar,
        name: user.name,
      },
      lastMessage: {
        message: "",
        createdAt: null,
      },
    } as Chat;

    startNewChat(chat);
  };

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

        <div className="flex items-center gap-4">
          <ChatIcon
            onClick={(event) => handleStartChat(event, user)}
            className="h-8 w-8 z-20 cursor-pointer text-zinc-600 animate-fadeIn"
          />

          {isFavorite ? (
            <FilledHeartIcon
              onClick={(event) => handleFavoriteToggle(event, user)}
              className="h-8 w-8 z-20 cursor-pointer text-primary animate-fadeIn"
            />
          ) : (
            <OutlinedHeartIcon
              onClick={(event) => handleFavoriteToggle(event, user)}
              className="h-8 w-8 z-20 cursor-pointer text-zinc-600 animate-fadeIn"
            />
          )}
        </div>
      </div>
    </li>
  );
});
