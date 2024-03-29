import { auth } from "@config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { SignInCredencials } from "@dtos/login/SignInCredencials";

import { getUserService } from "@services/user/getUserService";

export async function signInService(credencials: SignInCredencials) {
  const { email, password } = credencials;

  const response = await signInWithEmailAndPassword(auth, email, password);

  const token = await response.user.getIdToken();

  const { uid } = response.user;

  const user = await getUserService(uid);

  if (!user) {
    return null;
  }

  return {
    user,
    token,
  };
}
