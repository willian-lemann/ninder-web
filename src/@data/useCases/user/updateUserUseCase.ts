import { firestore } from "@config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { User } from "@data/entities/user";

export async function updateUserUseCase(id: string, data: Partial<User>) {
  const usersRef = doc(firestore, "users", id);
  await updateDoc(usersRef, { ...data });
}
