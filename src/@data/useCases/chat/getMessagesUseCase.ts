import { firestore } from "@config/firebase";
import { Message } from "@data/entities/message";

import { collection, query, getDocs, where } from "firebase/firestore";

export async function getMessagesUseCase(chatId: string) {
  const messagesRef = collection(firestore, "messages");
  const docsSnap = query(messagesRef, where("chatId", "==", chatId));

  const docChats = await getDocs(docsSnap);

  const messages = docChats.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Message[];

  const sortedMessages = messages.sort((a, b) => {
    if (!a.sentAt) return -1;

    if (a.sentAt.seconds < Number(b.sentAt.seconds)) return 1;

    return -1;
  });

  return sortedMessages.reverse();
}
