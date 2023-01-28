import { classNames } from "@utils/classNames";

import Image from "next/image";

import { formatDate } from "@functions/formatDate";
import { useAuthContext } from "@context/auth";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Avatar } from "./Avatar";
import { Chat } from "@data/models/chat";

interface ChatItemProps {
  chat: {
    id?: string;
    lastMessage: {
      message: string;
      createdAt?: Date | null;
    };
    user: {
      id: string;
      name: string;
      avatar: string;
    };
    sentAt: Date | null;
    isUnRead: boolean;
  };
  isSelected: boolean;
  onSelectChat: (chat: Chat) => void;
}

export const ChatItem = ({ chat, isSelected, onSelectChat }: ChatItemProps) => {
  const formattedDateToNow = formatDate(chat.sentAt);

  return (
    <li
      onClick={() =>
        onSelectChat({
          id: chat.id,
          user: {
            id: chat.user.id,
            avatar: chat.user.avatar,
            name: chat.user.name,
          },
          lastMessage: {
            message: chat.user.id,
            createdAt: chat.sentAt,
          },
        })
      }
      className={classNames(
        isSelected ? "bg-zinc-100" : "hover:bg-zinc-100",
        "flex items-center justify-between  px-6 py-2 transition-colors duration-300 cursor-pointer"
      )}
    >
      <section className="flex items-center">
        <Avatar image={chat.user.avatar} />

        <div className="ml-2">
          <strong>{chat.user.name}</strong>
          <p
            className={classNames(
              chat.isUnRead ? "text-primary" : "text-zinc-600",
              "truncate max-w-[250px]"
            )}
          >
            {chat.lastMessage.message}
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-1 items-end">
        <span>{formattedDateToNow}</span>

        <span
          className={classNames(
            chat.isUnRead ? "not-sr-only" : "sr-only",
            "bg-primary w-4 h-w-4 text-center text-white rounded-full text-xs"
          )}
        >
          1
        </span>
      </section>
    </li>
  );
};
