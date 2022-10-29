import { auth } from "@config/firebase";
import { signOut } from "firebase/auth";

export async function logoutService() {
  await signOut(auth);
}
