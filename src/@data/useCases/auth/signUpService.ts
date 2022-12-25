import { auth } from "@config/firebase";

import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";

import { RegisterForm } from "@dtos/login/RegisterForm";

import { createUserUseCase } from "@data/useCases/user/createUserUseCase";
import { User } from "@models/user";
import { Provider } from "@constants/login/provider";

export async function signUpUseCase(signUpData: RegisterForm) {
  const { email, password, confirmPassword, ...data } = signUpData;

  const response = await createUserWithEmailAndPassword(auth, email, password);

  const { user } = response;

  const token = await user.getIdToken();

  const payload: User = {
    ...data,
    email,
    hasConfirmedRegulation: false,
    provider: Provider.Internal,
  };

  const registeredUser = await createUserUseCase(user.uid, payload);

  return { token, user: registeredUser };
}
