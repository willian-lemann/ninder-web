import { firestore } from "@config/firebase";

import { collection, getDocs, query } from "firebase/firestore";

export async function getChatsService() {
  const messagesRef = collection(firestore, "chats");
  const docsSnap = query(messagesRef);

  const docChats = await getDocs(docsSnap);

  const chats = docChats.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return chats;
}
