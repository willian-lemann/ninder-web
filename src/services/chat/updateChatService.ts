import { firestore } from "@config/firebase";
import {
  updateDoc,
  addDoc,
  doc,
  collection,
  Timestamp,
} from "firebase/firestore";

import { UpdateChatDto } from "@dtos/chat/update-chat-dto";

export async function updateChatService(
  id: string,
  updateChatDto: UpdateChatDto
) {
  const chatsRef = doc(firestore, "chats", id);

  await updateDoc(chatsRef, { ...updateChatDto });
}
