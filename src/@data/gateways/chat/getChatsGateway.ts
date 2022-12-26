import { firestore } from "@config/firebase";
import { ChatDTO } from "@data/dtos";
import { Chat } from "@data/entities/chat";

import { collection, query, getDocs, where } from "firebase/firestore";

interface Params {
  id: string;
  name: string;
  avatar: string;
}

export async function getChatsGateway(currentUser: Params) {
  const chatsRef = collection(firestore, "chats");

  const docsSnap = query(
    chatsRef,
    where("users", "array-contains", currentUser)
  );

  const docChats = await getDocs(docsSnap);

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

  const mostRecentChatsSorted = chats.sort((a, b) => {
    if (!a.lastMessage?.sentAt) return -1;

    if (a.lastMessage.sentAt.seconds < Number(b.lastMessage?.sentAt.seconds))
      return 1;

    return -1;
  });

  return mostRecentChatsSorted;
}