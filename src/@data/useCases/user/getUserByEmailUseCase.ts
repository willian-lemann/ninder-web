import { firestore } from "@config/firebase";
import { User } from "@models/user";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export async function getUserByEmailUseCase(email: string) {
  const usersRef = collection(firestore, "users");
  const usersQuery = query(usersRef, where("email", "==", email));

  const docsSnap = await getDocs(usersQuery);

  if (docsSnap.empty) {
    return null;
  }

  const users = docsSnap.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as User[];

  const user = users[0];

  console.log(user);
  return user;
}
