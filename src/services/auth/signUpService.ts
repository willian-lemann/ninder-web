import { auth, firestore } from "@config/firebase";

import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { RegisterForm } from "@dtos/login/RegisterForm";

import { ResponseData } from "@dtos/login/ResponseData";
import { createUserService } from "@services/user/createUserService";

export async function signUpService(
  signUpData: RegisterForm
): Promise<ResponseData> {
  const { email, password, ...data } = signUpData;

  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  const token = await user.getIdToken();

  const { confirmPassword, ...payload } = data;

  await createUserService(user.uid, { email, ...payload }).catch(async () => {
    await deleteUser(user);
  });

  return { token, user: { email, id: user.uid } };
}
