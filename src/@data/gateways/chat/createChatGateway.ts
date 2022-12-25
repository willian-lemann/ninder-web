import { firestore } from "@config/firebase";
import { Chat } from "@data/entities";
import { setDoc, doc, collection } from "firebase/firestore";

interface Params {
  data: Partial<Chat>;
}

export async function createChatGateway({ data }: Params) {
  const chatsRef = doc(collection(firestore, "chats"));

  await setDoc(chatsRef, { ...data });

  return chatsRef.id;
}
