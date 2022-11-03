import Image from "next/image";
import { ChangeEvent } from "react";

interface PreviewImageProps {
  preview: string;
  onChangeImage: (event: ChangeEvent<HTMLInputElement> | null) => void;
}

export const PreviewImage = ({ preview, onChangeImage }: PreviewImageProps) => {
  return (
    <div
      className="relative h-32 w-32 flex items-center justify-center"
      onClick={() => onChangeImage(null)}
    >
      <Image
        src={preview}
        fill
        alt="preview image"
        loading="lazy"
        className="rounded-full cursor-pointer object-cover"
      />
      <span className="absolute text-white bg-zinc-400 opacity-70 px-2 rounded-md hover:cursor-pointer hover:opacity-80 transition-all duration-300">
        Change photo
      </span>
    </div>
  );
};
