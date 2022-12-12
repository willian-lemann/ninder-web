import { useUserDetails } from "@context/users";
import Image from "next/image";
import { useRouter } from "next/router";

import { getGender } from "@models/user";
import { createChatService } from "@services/chat/createChatService";
import { useAuthContext } from "@context/auth";
import { CreateUserDto } from "@dtos/chat/create-user-dto";
import { addErrorNotification } from "@components/shared/alert";

export default function User() {
  const { user: currentUser } = useAuthContext();
  const { query, push } = useRouter();
  const { user, isLoading } = useUserDetails(query.id as string);

  const handleStartConversation = async (userId: string) => {
    try {
      const payload: CreateUserDto = {
        senderId: currentUser?.id as string,
        receiverId: userId,
        lastMessage: { message: "", sendAt: new Date() },
      };

      const { result, error, success } = await createChatService(payload);

      if (!success) return addErrorNotification(error as string);

      push(`/chat/${userId}`);
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
          onClick={() => handleStartConversation(user.id)}
          className="rounded-md bg-primary text-white px-4 py-2 hover:brightness-90 transition-[filter] duration-300"
        >
          Start a conversation
        </button>
      </div>
    </div>
  );
}
