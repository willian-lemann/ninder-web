import { auth } from "@config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function signInWithEmailAndPasswordGateway(
  email: string,
  password: string
) {
  const response = await signInWithEmailAndPassword(auth, email, password);

  const token = await response.user.getIdToken();
  const userId = response.user.uid;

  return {
    token,
    userId,
  };
}
