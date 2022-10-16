import Image from "next/image";
import { ChangeEvent } from "react";

interface PreviewImageProps {
  preview: string;
  onChangeImage: (event: ChangeEvent<HTMLInputElement> | null) => void;
}

export const PreviewImage = ({ preview, onChangeImage }: PreviewImageProps) => {
  return (
    <div className="relative h-32 w-32">
      <Image
        src={preview}
        layout="fill"
        alt="preview image"
        objectFit="cover"
        loading="lazy"
        className="rounded-full cursor-pointer "
        onClick={() => onChangeImage(null)}
      />
    </div>
  );
};
