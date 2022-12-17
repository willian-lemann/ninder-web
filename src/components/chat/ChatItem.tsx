import { classNames } from "@utils/classNames";
import { Timestamp } from "firebase/firestore";
import Image from "next/image";

import { formatDate } from "@models/chat";

interface ChatItemProps {
  avatar: string;
  title: string;
  subtitle: string;
  sentAt: Timestamp;
  unread: number;
  onStartChatting: () => void;
}

export const ChatItem = ({
  avatar,
  title,
  subtitle,
  unread,
  sentAt,
  onStartChatting,
}: ChatItemProps) => {
  const formattedDateToNow = formatDate(sentAt);

  return (
    <li
      onClick={() => onStartChatting()}
      className="flex items-center justify-between px-4 py-2 hover:bg-zinc-200 transition-colors duration-300 cursor-pointer"
    >
      <section className="flex items-center">
        <div className="h-10 w-10 relative rounded-full">
          <Image
            src={avatar}
            alt="avatar image"
            fill
            className="rounded-full object-cover"
          />
        </div>

        <div className="ml-2">
          <strong>{title}</strong>
          <p className="truncate max-w-[250px]">{subtitle}</p>
        </div>
      </section>

      <section className="flex flex-col gap-1 items-end">
        <span>{formattedDateToNow}</span>

        <span
          className={classNames(
            unread > 0 ? "not-sr-only" : "sr-only",
            "bg-primary w-4 h-w-4 text-center text-white rounded-full text-xs"
          )}
        >
          {unread}
        </span>
      </section>
    </li>
  );
};
