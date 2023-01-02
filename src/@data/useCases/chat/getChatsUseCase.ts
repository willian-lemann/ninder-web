import { ChatDTO } from "@data/dtos";
import { Chat } from "@data/entities";
import { getChatsGateway } from "@data/gateways/chat/getChatsGateway";
import { getSortedChatsByRecent } from "@utils/getSortedChatsByRecent";

interface Params {
  id: string;
  name: string;
  avatar: string;
}

export async function getChatsUseCase(currentUser: Params) {
  const docChats = await getChatsGateway(currentUser);

  const chats = docChats.docs.map((doc) => {
    const chat = { ...doc.data(), id: doc.id } as Chat;

    const userChatWith = chat.users.find(
      (chatuser) => chatuser.id !== currentUser.id
    );

    return {
      id: chat.id,
      lastMessage: {
        message: chat.lastMessage.message,
        sentAt: chat.lastMessage.sentAt,
        sentBy: chat.lastMessage.sentBy,
        unRead: chat.lastMessage.unRead,
      },
      user: userChatWith,
    };
  }) as ChatDTO[];

  const mostRecentChatsSorted = getSortedChatsByRecent(chats);

  return mostRecentChatsSorted;
}
