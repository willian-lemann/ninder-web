import { firestore } from "@config/firebase";
import { User } from "@models/user";
import { getDocs, collection } from "firebase/firestore";

import { differenceInYears } from "date-fns";

export async function getUsersService() {
  const usersRef = collection(firestore, "users");
  const docsSnap = await getDocs(usersRef);

  const users = docsSnap.docs.map((doc) => {
    const data = doc.data() as User;

    return {
      ...data,
      id: doc.id,
    };
  }) as User[];

  return {
    data: {
      result: users,
    },
  };
}
