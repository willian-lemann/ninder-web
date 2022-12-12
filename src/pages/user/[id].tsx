import { useUserDetails } from "@context/users";
import Image from "next/image";
import { useRouter } from "next/router";

import { getGender, User } from "@models/user";
import { createChatService } from "@services/chat/createChatService";

import { CreateChatDto } from "@dtos/chat/create-chat-dto";
import { useAuthContext } from "@context/auth";

export default function UserDetails() {
  const { user: currentUser } = useAuthContext();
  const { query, push } = useRouter();
  const { user, isLoading } = useUserDetails(query.id as string);

  const handleStartConversation = async ({ id, name, avatar }: User) => {
    try {
      const payload: CreateChatDto = {
        user: { avatar: avatar as string, id, name },
        senderId: currentUser?.id as string,
        lastMessage: { message: "", sentAt: new Date() },
      };

      await createChatService(payload);

      push(`/chat/${user.id}`);
    } catch (error) {
      alert(error);
    }
  };

  if (isLoading) return <p>loading...</p>;

  return (
    <div className="container">
      <div className="flex items-center mt-10">
        <div className="relative h-[100px] w-[100px] object-cover rounded-full border-4 border-black">
          <Image
            src={user.avatar as string}
            alt="user avatar"
            fill
            className="rounded-full"
          />
        </div>

        <div className="px-4">
          <strong>{user.name}</strong>
          <p>
            {user.hometown}, <span>{user.nationality}</span>
          </p>
        </div>
      </div>

      <div className="p-4">
        <p>{user.bio}</p>

        <p>{user.email}</p>
        <p>{getGender(user.gender as number)}</p>
        <p>{user.occupation}</p>
        <div>
          <strong>Phone number:</strong>
          <span>{user.phone}</span>
        </div>
      </div>

      <div>
        <button
          onClick={() => handleStartConversation(user)}
          className="rounded-md bg-primary text-white px-4 py-2 hover:brightness-90 transition-[filter] duration-300"
        >
          Start a conversation
        </button>
      </div>
    </div>
  );
}
