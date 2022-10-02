import {
  firebaseDB,
  collection,
  addDoc,
  getDoc,
  doc,
} from "../../config/firebase";
import { User } from "../../models/user";

export async function createUserService(user: User) {
  const response = await getDoc(doc(firebaseDB, "users", user.userId));

  const alreadyExistInDatabase = response.exists();

  if (alreadyExistInDatabase) return;

  const document = await addDoc(collection(firebaseDB, "users"), user);

  return document.id;
}
