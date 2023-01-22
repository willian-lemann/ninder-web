import { memo, MouseEvent } from "react";
import Router from "next/router";

import { getDistanceBetweenTwoCoords } from "@utils/getDistanceBetweenTwoCoords";

import { User } from "@data/entities/user";

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
import { Chat } from "@data/entities";

interface UserCardProps {
  user: User;
  toggleMap: boolean;
}

export const UserCard = memo(({ user, toggleMap }: UserCardProps) => {
  const { user: currentUser } = useAuthContext();
  const { startNewChat } = useChatsContext();
  const { favorite, favorites, checkUserIsFavorited } = useFavoriteUsers();

  const handleStartChat = (
    event: MouseEvent<SVGSVGElement, globalThis.MouseEvent>
  ) => {
    event.stopPropagation();

    const chat = {
      userId: currentUser?.id as string,
      chatWith: user.id as string,
      lastMessage: "",
    } as Chat;

    startNewChat(chat);

    Router.push("/chats");
  };

  const handleSeeUserDetails = (id: string) => {
    Router.push(`/user/${id}`);
  };

  const distance = getDistanceBetweenTwoCoords({
    isMiles: false,
    sourceLocation: {
      latitude: currentUser?.latitude as number,
      longitude: currentUser?.longitude as number,
    },
    targetLocation: {
      latitude: user.latitude as number,
      longitude: user.longitude as number,
    },
  });

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
            {distance} kilometers away
          </p>
        </div>

        <div className="flex items-center gap-4">
          <ChatIcon
            onClick={handleStartChat}
            className="h-8 w-8 z-20 cursor-pointer text-zinc-600 animate-fadeIn"
          />

          {isFavorite ? (
            <FilledHeartIcon
              onClick={(event) => favorite(event, user)}
              className="h-8 w-8 z-20 cursor-pointer text-primary animate-fadeIn"
            />
          ) : (
            <OutlinedHeartIcon
              onClick={(event) => favorite(event, user)}
              className="h-8 w-8 z-20 cursor-pointer text-zinc-600 animate-fadeIn"
            />
          )}
        </div>
      </div>
    </li>
  );
});
