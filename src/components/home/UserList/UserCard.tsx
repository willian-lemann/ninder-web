import { memo } from "react";

import { differenceInYears } from "date-fns";
import { Timestamp } from "firebase/firestore";

import { User } from "@models/user";

import { HeartIcon as OutlinedHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as FilledHeartIcon } from "@heroicons/react/24/solid";

import Image from "next/image";

interface UserCardProps {
  user: User;
}

export const UserCard = memo(({ user }: UserCardProps) => {
  const renderUserAgeLabel = (birthday: Timestamp) => {
    const age = differenceInYears(new Date(), birthday.toDate());
    return age;
  };

  return (
    <li key={user.id}>
      <div className="h-[200px] object-cover relative rounded-md">
        <FilledHeartIcon className="h-8 w-8 z-20 absolute right-2 top-2 cursor-pointer text-primary" />

        <Image
          className="rounded-md"
          src={user.avatar as string}
          alt="user avatar"
          fill
        />
      </div>

      <div>
        <div>
          <strong className="m-0">{user.name},</strong>
          <span>{renderUserAgeLabel(user.birthday as Timestamp)}</span>
        </div>

        <p className="m-0 text-sm leading-3 text-zinc-400">
          10 kilometers away
        </p>
      </div>
    </li>
  );
});
