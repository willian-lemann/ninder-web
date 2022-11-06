import { useState, useEffect } from "react";
import Router from "next/router";
import {
  useSession,
  signIn as NextAuthSignIn,
  signOut as NextAuthSignOut,
} from "next-auth/react";
import { destroyCookie, parseCookies, setCookie } from "nookies";

import { User } from "@models/user";

import { SignInCredencials } from "@dtos/login/SignInCredencials";
import { SignUpCredencials } from "@dtos/login/SignUpCredencials";
import { useGeoLocation } from "@hooks/useGeoLocation";

import { signInService } from "@services/auth/signInService";
import { signUpService } from "@services/auth/signUpService";
import { logoutService } from "@services/auth/logoutService";

import { STORAGE_KEY } from "src/constants/login/auth";
import { useGoogleContext } from ".";

import { createGoogleUserService } from "@services/user/createGoogleUserService";
import { getUserByEmailService } from "@services/user/getUserByEmailService";
import { Provider } from "@constants/login/provider";
import { addErrorNotification } from "@components/shared/alert";
import { getUserService } from "@services/user/getUserService";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@config/firebase";

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
    const response = await signInService({
      email,
      password,
    });

    if (!response) {
      return addErrorNotification(
        "User does not exist or is not registered in our database."
      );
    }

    const { token, user } = response;

    setUser({ ...user, location });

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
      provider: Provider.Internal,
    });

    setUser(user);

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

    onAuthStateChanged(auth, (stateUser) => {
      getUserService(stateUser?.uid as string).then((recoveredUser) =>
        setUser(recoveredUser)
      );
    });
  }, []);

  console.log(user);

  useEffect(() => {
    async function loadGoogleSession() {
      if (session) {
        console.log("session");
        const sessionUser: User = {
          email: session.user?.email as string,
          avatar: session.user?.image as null,
          name: session.user?.name as string,
          provider: Provider.Google,
        };

        const hasUser = await getUserByEmailService(sessionUser.email);

        if (hasUser) return setUser({ ...hasUser, location });

        await createGoogleUserService({ ...sessionUser, location });

        setUser(sessionUser);
      }
    }

    loadGoogleSession();
  }, [session, location]);

  return {
    user,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
  };
}
