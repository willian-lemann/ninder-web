import Image from "next/image";

interface ThumbnailProps {
  image: string | null;
}

export const Thumbnail = ({ image }: ThumbnailProps) => {
  return (
    <div className="w-full h-full relative rounded-md">
      {image ? (
        <Image
          className="rounded-md object-cover"
          src={image as string}
          alt="user avatar"
          fill
        />
      ) : (
        <div className="flex items-center justify-center bg-zinc-200 rounded-md h-full">
          <span className="text-zinc-600">No image provided</span>
        </div>
      )}
    </div>
  );
};
