import { firestore } from "@config/firebase";
import { User } from "@models/user";
import { doc, setDoc } from "firebase/firestore";

export async function createGoogleUserService(user: Partial<User>) {
  const docRef = doc(firestore, "users", user.email as string);
  await setDoc(docRef, { ...user });
}
