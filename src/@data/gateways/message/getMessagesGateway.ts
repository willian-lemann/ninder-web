import { firestore } from "@config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getMessagesGateway(chatId: string) {
  const messagesRef = collection(firestore, "messages");
  const docsSnap = query(messagesRef, where("chatId", "==", chatId));

  const docChats = await getDocs(docsSnap);

  return docChats;
}
