import { useAuthContext } from "@context/auth";
import { formatDate } from "@functions/formatDate";
import { UserCircleIcon } from "@heroicons/react/24/outline";

import { classNames } from "@utils/classNames";
import { Timestamp } from "firebase/firestore";
import Image from "next/image";
import { memo, useCallback } from "react";
import { Avatar } from "./Avatar";

interface MessageItemProps {
  message: {
    id: string;
    avatar: string;
    date: Timestamp;
    name: string;
    sentBy: string;
    messageText: string;
  };
}

export const MessageItem = memo(({ message }: MessageItemProps) => {
  const { user: currentUser } = useAuthContext();

  const isCurrentUserSender = message?.sentBy === currentUser?.id;

  const renderMessageImage = useCallback(() => {
    if (isCurrentUserSender) {
      return <Avatar image={currentUser.avatar as string} />;
    }

    return <Avatar image={message.avatar} />;
  }, [currentUser?.avatar, isCurrentUserSender, message.avatar]);

  return (
    <li
      className={classNames(
        isCurrentUserSender ? "self-end" : "self-start",
        "flex mb-10 first:mt-6 items-center animate-fadeIn"
      )}
    >
      <div
        className={classNames(
          isCurrentUserSender ? "hidden" : "block",
          "h-12 w-12 relative rounded-full"
        )}
      >
        {renderMessageImage()}
      </div>

      <div className="px-2 flex-1">
        <div
          className={classNames(
            isCurrentUserSender ? "bg-zinc-100" : "bg-primary text-white",
            " rounded-md px-2 py-2 w-fit flex flex-col gap-2"
          )}
        >
          <p>{message.messageText}</p>

          <span
            className={classNames(
              isCurrentUserSender ? "text-zinc-400" : "text-zinc-200",
              "font-normal pl-2 self-end text-xs"
            )}
          >
            {formatDate(message.date)}
          </span>
        </div>
      </div>
    </li>
  );
});
