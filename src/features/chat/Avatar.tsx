import { UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface AvatarProps {
  image: string | null;
}

export const Avatar = ({ image }: AvatarProps) => {
  if (!image) {
    return (
      <div className="h-12 w-12">
        <UserCircleIcon className="text-zinc-400" height={50} width={50} />
      </div>
    );
  }

  return (
    <div className="h-12 w-12 relative rounded-full">
      <Image
        src={image}
        alt="avatar image"
        fill
        className="rounded-full object-cover"
      />
    </div>
  );
};
