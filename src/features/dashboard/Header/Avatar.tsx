import { UserCircleIcon as UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface AvatarProps {
  avatar: string | null;
}

export const Avatar = ({ avatar }: AvatarProps) => {
  if (!avatar) {
    return <UserIcon className="h-12 w-12 text-title-opacity" />;
  }

  return (
    <div className="h-8 w-8 rounded-full">
      <Image
        className="object-cover rounded-full"
        src={avatar}
        alt="avatar image"
        fill
        loading="lazy"
      />
      )
    </div>
  );
};
