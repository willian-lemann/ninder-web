import { useEffect, useState } from "react";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";

import { User } from "@models/user";
import { SignInCredencials } from "@dtos/login/SignInCredencials";

import { signInService } from "@services/auth/signInService";
import { SignUpCredencials } from "@dtos/login/SignUpCredencials";
import { useGeoLocation } from "src/hooks/useGeoLocation";

import { getUserService } from "@services/user/getUserService";
import { signUpService } from "@services/auth/signUpService";
import { logoutService } from "@services/auth/logoutService";

import { STORAGE_KEY } from "src/constants/auth";
import { addErrorNotification } from "@components/shared/alert";
import { errors } from "@utils/errorHandler";
import { FirebaseError } from "firebase/app";

export interface InitialState {
  user: User | null;
  signIn(credencials: SignInCredencials): Promise<void>;
  signUp(credencials: SignUpCredencials): Promise<void>;
  signOut(): Promise<void>;
}

export function useAuth(): InitialState {
  const [user, setUser] = useState<User | null>(null);
  const location = useGeoLocation();

  async function signIn({ email, password }: SignInCredencials) {
    const { token, user } = await signInService({
      email,
      password,
    });

    const authenticatedUser: User = {
      id: user.id,
      email,
      name: "",
    };

    setUser(authenticatedUser);

    setCookie(undefined, STORAGE_KEY, token, {
      maxAge: 60 * 60 * 24 * 30, // 30 days,
      path: "/",
    });

    Router.push("/");
  }

  async function signUp(signUpData: SignUpCredencials) {
    const { email, name, password } = signUpData;

    const { token, user } = await signUpService({
      email,
      password,
      name,
    });

    const authenticatedUser: User = {
      id: user.id,
      email,
      name,
    };

    setUser(authenticatedUser);

    setCookie(undefined, STORAGE_KEY, token, {
      maxAge: 60 * 60 * 24 * 30, // 30 days,
      path: "/",
    });

    Router.push("/regulations");
  }

  async function signOut() {
    await logoutService();
    destroyCookie(undefined, STORAGE_KEY);
    Router.replace("/login");
  }

  // useEffect(() => {
  //   const { [STORAGE_KEY]: token } = parseCookies();

  //   if (token) {
  //     getUserService(token).then((response) => {
  //       setUser(response);
  //     });
  //   }
  // }, [user?.id]);

  return {
    user,
    signIn,
    signUp,
    signOut,
  };
}
