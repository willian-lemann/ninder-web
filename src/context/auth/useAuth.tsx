import { useState, useEffect } from "react";
import Router from "next/router";
import {
  useSession,
  signIn as NextAuthSignIn,
  signOut as NextAuthSignOut,
} from "next-auth/react";
import { destroyCookie, setCookie } from "nookies";

import { User } from "@models/user";

import { SignInCredencials } from "@dtos/login/SignInCredencials";
import { SignUpCredencials } from "@dtos/login/SignUpCredencials";
import { useGeoLocation } from "@hooks/useGeoLocation";

import { signInService } from "@services/auth/signInService";
import { signUpService } from "@services/auth/signUpService";
import { logoutService } from "@services/auth/logoutService";

import { STORAGE_KEY } from "src/constants/auth";
import { useGoogleContext } from ".";
import { createUserService } from "@services/user/createUserService";
import { createGoogleUserService } from "@services/user/createGoogleUserService";
import { getUserService } from "@services/user/getUserService";
import { getUserByEmailService } from "@services/user/getUserByEmailService";

export interface InitialState {
  user: User | null;
  signIn(credencials: SignInCredencials): Promise<void>;
  signInWithGoogle(): Promise<void>;
  signUp(credencials: SignUpCredencials): Promise<void>;
  signOut(): Promise<void>;
}

export function useAuth(): InitialState {
  const { session } = useGoogleContext();

  const [user, setUser] = useState<User | null>(null);
  const location = useGeoLocation();

  let authChannel: BroadcastChannel;

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

    if (user.hasConfirmedRegulation) {
      Router.push("/");
    } else {
      Router.push("/regulations");
    }
  }

  async function signUp(signUpData: SignUpCredencials) {
    const { token, user } = await signUpService({
      ...signUpData,
      location,
      hasConfirmedRegulation: false,
    });

    const { email, name } = signUpData;

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

  async function signInWithGoogle() {
    await NextAuthSignIn("google");
  }

  async function signOut() {
    await logoutService();
    setUser(null);
    destroyCookie(undefined, STORAGE_KEY);

    if (session) {
      await NextAuthSignOut();
    }

    authChannel?.postMessage("signOut");

    Router.replace("/login");
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    authChannel = new BroadcastChannel("auth");

    authChannel.onmessage = (message) => {
      if (message.data === "signOut") {
        signOut();
      }
    };
  }, []);

  useEffect(() => {
    async function loadSession() {
      if (session) {
        const sessionUser = {
          email: session.user?.email as string,
          avatar: session.user?.image as null,
          name: session.user?.name as string,
        };

        const hasUser = await getUserByEmailService(sessionUser.email);

        if (hasUser) return setUser(hasUser);

        createUserService(sessionUser.email, sessionUser).then(() => {
          setUser(sessionUser);
        });
      }
    }

    loadSession();
  }, [session]);

  return {
    user,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
  };
}
