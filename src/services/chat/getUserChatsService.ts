import { firestore } from "@config/firebase";
import { Chat } from "@models/chat";

import { collection, query, getDocs, where } from "firebase/firestore";

export async function getUserChatsService(userId: string) {
  const chatsRef = collection(firestore, "chats");
  const docsSnap = query(chatsRef, where("senderId", "==", userId));

  const docChats = await getDocs(docsSnap);

  const chats = docChats.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Chat[];

  return chats;
}
