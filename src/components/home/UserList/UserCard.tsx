import { memo } from "react";

import { getDistanceBetweenTwoCoords } from "@utils/getDistanceBetweenTwoCoords";
import { differenceInYears } from "date-fns";
import { Timestamp } from "firebase/firestore";

import { formatAge, User } from "@models/user";

import { HeartIcon as OutlinedHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as FilledHeartIcon } from "@heroicons/react/24/solid";

import Image from "next/image";
import { useGeoLocation } from "@hooks/useGeoLocation";
import { useAuthContext } from "@context/auth";

interface UserCardProps {
  user: User;
}

export const UserCard = memo(({ user }: UserCardProps) => {
  const { user: currentUser } = useAuthContext();

  const distance = getDistanceBetweenTwoCoords({
    isMiles: false,
    currentLocation: currentUser?.location,
    targetLocation: user.location,
  });

  return (
    <li key={user.id} className="w-full h-[200px]">
      <div className="w-full h-full relative rounded-md">
        <FilledHeartIcon className="h-8 w-8 z-20 absolute right-2 top-2 cursor-pointer text-primary" />

        <Image
          className="rounded-md object-cover"
          src={user.avatar as string}
          alt="user avatar"
          fill
        />
      </div>

      <div className="mt-2">
        <div>
          <strong className="m-0">{user.name},</strong>
          <span>{formatAge(user.birthday as Timestamp)}</span>
        </div>

        <p className="m-0 text-sm leading-3 text-zinc-400">
          {distance} kilometers away
        </p>
      </div>
    </li>
  );
});
