import { firestore } from "@config/firebase";
import { User } from "@models/user";
import { doc, getDoc } from "firebase/firestore";

export async function getUserService(id: string): Promise<User | null> {
  const docRef = doc(firestore, "users", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  const user = docSnap.data() as User;

  return {
    ...user,
    id: docSnap.id,
  };
}
