import { firestore, storage } from "@config/firebase";
import { User } from "@models/user";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export async function createGoogleUserService(user: Partial<User>) {
  const docRef = doc(firestore, "users", user.email as string);
  const storageRef = ref(storage, `users/${docRef.id}`);

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
