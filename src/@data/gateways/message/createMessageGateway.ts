import { firestore } from "@config/firebase";
import { Message } from "@data/entities";

import { addDoc, collection } from "firebase/firestore";

export interface Params {
  data: Partial<Message>;
}

export async function createMessageGateway({ data }: Params) {
  const messagesRef = collection(firestore, "messages");
  await addDoc(messagesRef, { ...data });
}
