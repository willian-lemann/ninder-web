import { auth, firestore } from "@config/firebase";

import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { RegisterForm } from "@dtos/login/RegisterForm";

import { ResponseData } from "@dtos/login/ResponseData";
import { createUserService } from "@services/user/createUserService";
import { User } from "@models/user";

export async function signUpService(signUpData: RegisterForm) {
  const { email, password, confirmPassword, ...data } = signUpData;

  const response = await createUserWithEmailAndPassword(auth, email, password);

  const { user } = response;

  const token = await user.getIdToken();

  const registeredUser = await createUserService(user.uid, { email, ...data });

  return { token, user: registeredUser };
}
