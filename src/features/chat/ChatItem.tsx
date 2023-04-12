import { classNames } from "@/utils/classNames";

import { formatDate } from "@/functions/formatDate";

import { Avatar } from "./Avatar";
import { Chat } from "@data/models/chat";

interface ChatItemProps {
  chat: Chat;
  isSelected: boolean;
  onSelectChat: (chat: Chat) => void;
}

export const ChatItem = ({ chat, isSelected, onSelectChat }: ChatItemProps) => {
  const formattedDateToNow = formatDate(chat.lastMessage.createdAt);

  return (
    <li
      onClick={() => onSelectChat(chat)}
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
