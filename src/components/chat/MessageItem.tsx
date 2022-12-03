import Image from "next/image";

interface MessageItemProps {
  avatar: string;
  name: string;
  message: string;
  date: Date;
}

export const MessageItem = ({ avatar, name, message }: MessageItemProps) => {
  return (
    <li className="flex mb-10 first:mt-6">
      <div className="h-14 w-14 relative">
        <Image src={avatar} alt="avatar image" fill />
      </div>

      <div className="px-4 flex-1">
        <strong>
          {name} <span className="font-normal">6:59</span>
        </strong>

        <p>{message}</p>
      </div>
    </li>
  );
};
