import { auth } from "@config/firebase";
import { geohashLocation } from "@utils/geohashLocation";

import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";

import { RegisterForm } from "@dtos/login/RegisterForm";

import { createUserUseCase } from "@data/useCases/user/createUserUseCase";
import { User } from "@data/entities/user";
import { Provider } from "@constants/login/provider";

export async function signUpUseCase(signUpData: RegisterForm) {
  const { email, password, confirmPassword, location, ...data } = signUpData;

  const response = await createUserWithEmailAndPassword(auth, email, password);

  const { user } = response;

  const token = await user.getIdToken();

  // TODO: pegar location da localidade da pessoa caso nao tenha permitido pegar sua localizacao

  const locationHash = geohashLocation(
    Number(location?.latitude),
    Number(location?.longitude)
  );

  const payload: User = {
    ...data,
    location: locationHash,
    email,
    hasConfirmedRegulation: false,
    provider: Provider.Internal,
  };

  console.log(user.uid);

  const registeredUser = await createUserUseCase(user.uid, payload);

  return { token, user: registeredUser };
}
