import { classNames } from "@utils/classNames";
import Image from "next/image";

interface ChatItemProps {
  avatar: string;
  title: string;
  subtitle: string;
  date: Date;
  unread: number;
}

export const ChatItem = ({
  avatar,
  title,
  subtitle,
  unread,
}: ChatItemProps) => {
  return (
    <li className="flex items-center justify-between px-4 py-2 hover:bg-zinc-200 transition-colors duration-300 cursor-pointer">
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
        <span>Just now</span>

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
