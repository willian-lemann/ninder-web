import { firestore } from "@config/firebase";
import { setDoc, doc, collection } from "firebase/firestore";

import { CreateChatDto } from "@dtos/chat/create-chat-dto";

export async function createChatService(createChatDto: CreateChatDto) {
  const chatsRef = doc(collection(firestore, "chats"));

  await setDoc(chatsRef, { ...createChatDto });
}
