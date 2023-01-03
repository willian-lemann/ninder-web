import Image from "next/image";
import { useState } from "react";

interface ThumbnailProps {
  image: string | null;
}

export const Thumbnail = ({ image }: ThumbnailProps) => {
  const [source, setSource] = useState(image as string);

  return (
    <div className="w-full h-full relative rounded-md">
      {image ? (
        <Image
          className="rounded-md object-cover"
          src={source}
          alt="user avatar"
          fill
          onError={() => setSource("/icons/avatar.svg")}
        />
      ) : (
        <div className="flex items-center justify-center bg-zinc-200 rounded-md h-full">
          <span className="text-zinc-600">No image provided</span>
        </div>
      )}
    </div>
  );
};
