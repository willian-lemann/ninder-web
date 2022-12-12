import { firestore } from "@config/firebase";

import { collection, query, getDocs, where } from "firebase/firestore";

export async function getUserChatsService(userId: string) {
  const messagesRef = collection(firestore, "chats");
  const docsSnap = query(messagesRef, where("id", "==", userId));

  const docChats = await getDocs(docsSnap);

  const chats = docChats.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return chats;
}
