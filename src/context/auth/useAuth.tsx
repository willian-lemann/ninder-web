import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import Router from "next/router";
import {
  signIn as NextAuthSignIn,
  signOut as NextAuthSignOut,
} from "next-auth/react";
import { destroyCookie, setCookie } from "nookies";

import { User } from "@data/entities/user";

import { SignInCredencials } from "@dtos/login/SignInCredencials";
import { SignUpCredencials } from "@dtos/login/SignUpCredencials";
import { useGeoLocation } from "@hooks/useGeoLocation";

import {
  signInUseCase,
  signUpUseCase,
  logoutUseCase,
} from "@data/useCases/auth";

import { STORAGE_KEY } from "src/constants/login/auth";
import { useGoogleContext } from ".";

import {
  createGoogleUserUseCase,
  getUserUseCase,
  getUserByEmailUseCase,
} from "@data/useCases/user";

import { Provider } from "@constants/login/provider";
import { addErrorNotification } from "@components/shared/alert";

import { onAuthStateChanged, beforeAuthStateChanged } from "firebase/auth";
import { auth } from "@config/firebase";

import { saveToStorageUseCase } from "@data/useCases/auth/saveToStorageUseCase";

export interface InitialState {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  signIn(credencials: SignInCredencials): Promise<void>;
  signInWithGoogle(): Promise<void>;
  signUp(credencials: SignUpCredencials): Promise<void>;
  signOut(): Promise<void>;
}

let authChannel: BroadcastChannel;

export function useAuth(): InitialState {
  const { session } = useGoogleContext();
  const [user, setUser] = useState<User | null>(null);

  const location = useGeoLocation();

  async function signIn({ email, password }: SignInCredencials) {
    const response = await signInUseCase(email, password);

    if (!response) {
      return addErrorNotification(
        "User does not exist or is not registered in our database."
      );
    }

    const { user, token } = response;

    setUser({ ...user, location });

    saveToStorageUseCase(token);

    if (user.hasConfirmedRegulation) {
      Router.push("/");
    } else {
      Router.push("/regulations");
    }
  }

  async function signUp(signUpData: SignUpCredencials) {
    const { token, user } = await signUpUseCase({
      ...signUpData,
      location,
    });

    setUser(user);

    saveToStorageUseCase(token);

    Router.push("/regulations");
  }

  async function signInWithGoogle() {
    await NextAuthSignIn("google");
  }

  const signOut = useCallback(async () => {
    await logoutUseCase();
    setUser(null);
    destroyCookie(undefined, STORAGE_KEY);

    if (session) {
      await NextAuthSignOut();
    }

    authChannel?.postMessage("signOut");

    Router.replace("/login");
  }, [session]);

  useEffect(() => {
    authChannel = new BroadcastChannel("auth");

    authChannel.onmessage = (message) => {
      if (message.data === "signOut") {
        signOut();
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (stateUser) => {
      if (!stateUser) {
        destroyCookie(undefined, STORAGE_KEY);
      } else {
        getUserUseCase(stateUser?.uid as string).then((recoveredUser) =>
          setUser(recoveredUser)
        );
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function loadGoogleSession() {
      if (session) {
        const sessionUser = {
          email: session.user?.email as string,
          avatar: session.user?.image as null,
          name: session.user?.name as string,
          provider: Provider.Google,
        };

        const hasUser = await getUserByEmailUseCase(sessionUser.email);

        if (hasUser) return setUser({ ...hasUser, location });

        await createGoogleUserUseCase({ ...sessionUser, location });

        setUser(sessionUser);
      }
    }

    loadGoogleSession();
  }, [session, location]);

  return {
    user,
    setUser,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
  };
}
