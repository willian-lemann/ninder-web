import { firestore, storage } from "@config/firebase";
import { setDoc, doc } from "firebase/firestore";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";

import { User } from "@data/entities/user";
import { createGateway } from "@data/gateways/user/create-gateway";

export async function createUseCase(data: Partial<User>) {
  // const docRef = doc(firestore, "users", id);
  // const storageRef = ref(storage, `users/${id}`);

  // if (user.avatar) {
  //   const file = user.avatar as Blob;
  //   const uploadTask = await uploadBytesResumable(storageRef, file);

  //   if (uploadTask.state === "success") {
  //     const url = await getDownloadURL(uploadTask.ref);

  //     const data = {
  //       ...user,
  //       id,
  //       avatar: url,
  //     };

  //     await setDoc(docRef, data);

  //     return data;
  //   }
  // }

  // const newUser: User = { ...user, id };

  // await setDoc(docRef, newUser);

  // return newUser;

  return await createGateway(data);
}
