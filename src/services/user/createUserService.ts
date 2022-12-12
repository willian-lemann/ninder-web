import { firestore, storage } from "@config/firebase";
import { setDoc, doc } from "firebase/firestore";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";

import { User } from "@models/user";

export async function createUserService(id: string, user: User) {
  const docRef = doc(firestore, "users", id);
  const storageRef = ref(storage, `users/${id}`);

  if (user.avatar) {
    const file = user.avatar as Blob;
    const uploadTask = await uploadBytesResumable(storageRef, file);

    if (uploadTask.state === "success") {
      const url = await getDownloadURL(uploadTask.ref);

      const data = {
        ...user,
        id,
        avatar: url,
      };

      await setDoc(docRef, data);

      return data;
    }
  }

  await setDoc(docRef, { ...user, id });

  return user as User;
}
