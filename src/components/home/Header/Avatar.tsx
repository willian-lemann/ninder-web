import { UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface AvatarProps {
  avatar: string | null;
}

export const Avatar = ({ avatar }: AvatarProps) => {
  if (!avatar) {
    return <UserCircleIcon className="h-8 w-8 text-zinc-600" />;
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
