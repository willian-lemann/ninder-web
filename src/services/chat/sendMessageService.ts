import { firestore } from "@config/firebase";
import {
  updateDoc,
  addDoc,
  doc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { SendMessageDto } from "@dtos/chat/send-message-dto";

export async function sendMessageService(sendMessageDto: SendMessageDto) {
  const { chatId } = sendMessageDto;

  // update meu chat
  const chatsRef = doc(firestore, "chats", chatId);

  const lastMessage = {
    message: sendMessageDto.messageText,
    sentAt: serverTimestamp(),
  };

  await updateDoc(chatsRef, { lastMessage });

  // adiciona nova mensagem
  const messagesRef = collection(firestore, "messages");

  await addDoc(messagesRef, { ...sendMessageDto });
}
