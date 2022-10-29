import { firestore, storage } from "@config/firebase";
import { setDoc, doc } from "firebase/firestore";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";

import { User } from "@models/user";

export async function createUserService(id: string, user: Partial<User>) {
  const docRef = doc(firestore, "users", id);
  const storageRef = ref(storage, `users/${id}`);

  if (user.avatar) {
    const uploadTask = uploadBytesResumable(storageRef, user.avatar);

    uploadTask.on(
      "state_changed",
      () => {},
      (err) => {
        console.log(err);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        await setDoc(docRef, { ...user, avatar: url });
      }
    );

    return;
  }

  await setDoc(docRef, { ...user });
}
