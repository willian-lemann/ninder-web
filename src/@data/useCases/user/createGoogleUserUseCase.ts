import { firestore } from "@config/firebase";
import { User } from "@data/entities/user";
import { doc, setDoc } from "firebase/firestore";

export async function createGoogleUserUseCase(user: Partial<User>) {
  const docRef = doc(firestore, "users", user.email as string);
  await setDoc(docRef, { ...user });
}
