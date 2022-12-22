import { firestore } from "@config/firebase";
import {
  updateDoc,
  addDoc,
  doc,
  collection,
  Timestamp,
} from "firebase/firestore";

import { SendMessageDto } from "@dtos/chat/send-message-dto";

export async function sendMessageService(sendMessageDto: SendMessageDto) {
  const { chatId } = sendMessageDto;

  const chatsRef = doc(firestore, "chats", chatId);

  const lastMessage = {
    message: sendMessageDto.messageText,
    sentBy: sendMessageDto.sentBy,
    sentAt: Timestamp.fromDate(new Date()),
    unRead: true,
  };

  await updateDoc(chatsRef, { lastMessage });

  const messagesRef = collection(firestore, "messages");

  await addDoc(messagesRef, { ...sendMessageDto });
}
