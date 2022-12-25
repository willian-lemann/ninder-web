import { auth } from "@config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { SignInCredencials } from "@dtos/login/SignInCredencials";

import { getUserUseCase } from "@data/useCases/user";

export async function signInUseCase(credencials: SignInCredencials) {
  const { email, password } = credencials;

  const response = await signInWithEmailAndPassword(auth, email, password);

  const token = await response.user.getIdToken();

  const { uid } = response.user;

  const user = await getUserUseCase(uid);

  if (!user) {
    return null;
  }

  return {
    user,
    token,
  };
}
