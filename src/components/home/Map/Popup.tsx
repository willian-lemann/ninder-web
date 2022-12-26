import { formatAge } from "@functions/formatAge";
import Image from "next/image";
import { useRouter } from "next/router";
import { Popup as LPopup } from "react-leaflet";

interface PopupProps {
  userInfo: {
    id: string;
    avatar: string;
    name: string;
    birthday: Date | null;
    hometown: string;
  };
}

export const Popup = ({ userInfo }: PopupProps) => {
  const router = useRouter();

  return (
    <LPopup closeButton={false}>
      <div className="h-44 flex flex-col justify-end">
        <div className="w-full h-[100px] absolute right-0 top-0">
          <Image
            src={userInfo.avatar}
            className="object-cover rounded-t-md"
            alt="user avatar"
            fill
          />
        </div>

        <div className="flex flex-col">
          <div>
            <strong>{userInfo.name}</strong>,
            <span className="pl-1">{formatAge(userInfo.birthday)}</span>
          </div>
          <span>{userInfo.hometown}</span>
        </div>

        <button
          className="mt-2 border-none bg-primary rounded-md text-white px-2 py-2"
          onClick={() => router.push(`/user/${userInfo.id}`)}
        >
          Start a conversation
        </button>
      </div>
    </LPopup>
  );
};
