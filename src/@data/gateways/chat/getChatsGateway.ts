import { firestore } from "@config/firebase";
import { ChatDTO } from "@data/dtos";
import { Chat } from "@data/entities/chat";

import { collection, query, getDocs, where } from "firebase/firestore";

interface Params {
  id: string;
  name: string;
  avatar: string;
}

export async function getChatsGateway(currentUser: Params) {
  const chatsRef = collection(firestore, "chats");

  const docsSnap = query(
    chatsRef,
    where("users", "array-contains", currentUser)
  );

  return await getDocs(docsSnap);
}
