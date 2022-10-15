import { auth, firestore } from "@config/firebase";

import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { SignUpCredencials } from "@dtos/login/SignUpCredencials";

import { ResponseData } from "@dtos/login/ResponseData";
import { createUserService } from "@services/user/createUserService";

export async function signUpService(
  signUpData: SignUpCredencials
): Promise<ResponseData> {
  const { email, password, name } = signUpData;

  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  const token = await user.getIdToken();

  await createUserService(user.uid, { email, name }).catch(async () => {
    await deleteUser(user);
  });

  return { token, user: { email, id: user.uid } };
}
