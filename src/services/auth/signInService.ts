import { auth } from "@config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { SignInCredencials } from "@dtos/login/SignInCredencials";
import { ResponseData } from "@dtos/login/ResponseData";

export async function signInService(
  credencials: SignInCredencials
): Promise<ResponseData> {
  const { email, password } = credencials;

  const { user } = await signInWithEmailAndPassword(auth, email, password);

  const token = await user.getIdToken();

  return { token, user: { id: user.uid, email } };
}
