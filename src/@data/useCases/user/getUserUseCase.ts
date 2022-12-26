import { firestore } from "@config/firebase";
import { User } from "@data/entities/user";
import { doc, getDoc } from "firebase/firestore";

export async function getUserUseCase(id: string) {
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
