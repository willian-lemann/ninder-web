import { classNames } from "@utils/classNames";
import { Timestamp } from "firebase/firestore";
import Image from "next/image";

import { formatDate } from "@models/chat";
import { useAuthContext } from "@context/auth";

interface ChatItemProps {
  sentBy: string;
  avatar: string;
  title: string;
  subtitle: string;
  sentAt: Timestamp;
  isUnRead: boolean;
  onStartChatting: () => void;
}

export const ChatItem = ({
  sentBy,
  avatar,
  title,
  subtitle,
  isUnRead,
  sentAt,
  onStartChatting,
}: ChatItemProps) => {
  const { user: currentUser } = useAuthContext();

  const formattedDateToNow = formatDate(sentAt);

  const isCurrentUserSender = sentBy === currentUser?.id;

  console.log(sentBy, currentUser?.id);
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
          <p
            className={classNames(
              !isCurrentUserSender && isUnRead
                ? "text-primary"
                : "text-zinc-600",
              "truncate max-w-[250px]"
            )}
          >
            {subtitle}
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-1 items-end">
        <span>{formattedDateToNow}</span>

        <span
          className={classNames(
            !isCurrentUserSender && isUnRead ? "not-sr-only" : "sr-only",
            "bg-primary w-4 h-w-4 text-center text-white rounded-full text-xs"
          )}
        >
          1
        </span>
      </section>
    </li>
  );
};
