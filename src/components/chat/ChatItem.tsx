import { classNames } from "@utils/classNames";
import { Timestamp } from "firebase/firestore";
import Image from "next/image";

import { formatDate } from "@functions/formatDate";
import { useAuthContext } from "@context/auth";

interface ChatItemProps {
  chat: {
    id?: string;
    sentBy: string;
    avatar: string;
    title: string;
    subtitle: string;
    sentAt: Timestamp;
    isUnRead: boolean;
  };
  isSelected: boolean;
  onSelectChat: (id: string) => void;
}

export const ChatItem = ({ chat, isSelected, onSelectChat }: ChatItemProps) => {
  const { user: currentUser } = useAuthContext();

  const formattedDateToNow = formatDate(chat.sentAt);

  const isCurrentUserSender = chat.sentBy === currentUser?.id;

  return (
    <li
      onClick={() => onSelectChat(chat.id as string)}
      className={classNames(
        isSelected ? "bg-zinc-200" : "hover:bg-zinc-100",
        "flex items-center justify-between  px-4 py-2 transition-colors duration-300 cursor-pointer"
      )}
    >
      <section className="flex items-center">
        <div className="h-10 w-10 relative rounded-full">
          <Image
            src={chat.avatar}
            alt="avatar image"
            fill
            className="rounded-full object-cover"
          />
        </div>

        <div className="ml-2">
          <strong>{chat.title}</strong>
          <p
            className={classNames(
              !isCurrentUserSender && chat.isUnRead
                ? "text-primary"
                : "text-zinc-600",
              "truncate max-w-[250px]"
            )}
          >
            {chat.subtitle}
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-1 items-end">
        <span>{formattedDateToNow}</span>

        <span
          className={classNames(
            !isCurrentUserSender && chat.isUnRead ? "not-sr-only" : "sr-only",
            "bg-primary w-4 h-w-4 text-center text-white rounded-full text-xs"
          )}
        >
          1
        </span>
      </section>
    </li>
  );
};
