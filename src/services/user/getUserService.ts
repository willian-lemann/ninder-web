import { firebaseDB, getDoc, doc } from "../../config/firebase";
import { User } from "../../models/user";

export async function getUserService(userId: string) {
   console.log(userId)
  const response = await getDoc(doc(firebaseDB, "users", userId));

  if (!response.exists()) {
    return null;
  }

  const user: User = {
    avatar: response.data().avatar,
    email: response.data().email,
    name: response.data().name,
    userId: response.id,
  };

  return user;
}
