import { firestore } from "@config/firebase";
import { Chat } from "@data/entities";
import { doc, Timestamp, updateDoc } from "firebase/firestore";

interface Params {
  id: string;
  data: Partial<Chat>;
}

export async function updateChatGateway({ id, data }: Params) {
  const chatsRef = doc(firestore, "chats", id);
  await updateDoc(chatsRef, { ...data });
}
