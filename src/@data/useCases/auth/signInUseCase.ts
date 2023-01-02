import { auth } from "@config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { SignInCredencials } from "@dtos/login/SignInCredencials";

import { getUserUseCase } from "@data/useCases/user";
import { setCookie } from "nookies";
import { STORAGE_KEY } from "@constants/login/auth";
import { signInWithEmailAndPasswordGateway } from "@data/gateways/auth/signInWithEmailAndPasswordGateway";

export async function signInUseCase(email: string, password: string) {
  const { token, userId } = await signInWithEmailAndPasswordGateway(
    email,
    password
  );

  const user = await getUserUseCase(userId);

  if (!user) {
    return null;
  }

  return {
    user,
    token,
  };
}
