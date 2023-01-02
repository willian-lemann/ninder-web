import { firestore } from "@config/firebase";
import { Message } from "@data/entities/message";
import { getMessagesGateway } from "@data/gateways/message/getMessagesGateway";

export async function getMessagesUseCase(chatId: string) {
  const docChats = await getMessagesGateway(chatId);

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
