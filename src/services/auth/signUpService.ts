import { auth } from "@config/firebase";

import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";

import { RegisterForm } from "@dtos/login/RegisterForm";

import { createUserService } from "@services/user/createUserService";
import { User } from "@models/user";
import { Provider } from "@constants/login/provider";

export async function signUpService(signUpData: RegisterForm) {
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

  const registeredUser = await createUserService(user.uid, payload);

  return { token, user: registeredUser };
}
