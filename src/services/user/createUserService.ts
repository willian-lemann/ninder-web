import { firestore } from "@config/firebase";
import { setDoc, doc, collection, getDoc } from "firebase/firestore";

import { User } from "@models/user";

export async function createUserService(id: string, user: Partial<User>) {
  const docRef = doc(firestore, "users", id);
  await setDoc(docRef, { ...user });
}
