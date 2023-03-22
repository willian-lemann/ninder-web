import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import Router from "next/router";
import {
  signIn as NextAuthSignIn,
  signOut as NextAuthSignOut,
} from "next-auth/react";
import { destroyCookie, parseCookies, setCookie } from "nookies";

import { User } from "@data/models/user";

import { SignInCredencials } from "@dtos/login/SignInCredencials";
import { SignUpCredencials } from "@dtos/login/SignUpCredencials";
import { useGeoLocation } from "@hooks/useGeoLocation";

import { STORAGE_KEY } from "src/constants/login/auth";
import { useGoogleContext } from ".";

import { addErrorNotification } from "@components/shared/alert";

import { api } from "@config/axios";
import { authenticateService } from "@services/auth/authenticate";
import { signupService } from "@services/auth/signup";

import { ResponseError } from "@utils/createApiResponse";
export interface InitialState {
  isAuthenticated: boolean;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isSubmitting: boolean;
  signIn(credencials: SignInCredencials): Promise<void>;
  signInWithGoogle(): Promise<void>;
  signUp(credencials: SignUpCredencials): Promise<void>;
  signOut(): Promise<void>;
}

let authChannel: BroadcastChannel;

export function useAuth(): InitialState {
  const { session } = useGoogleContext();
  const [user, setUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const location = useGeoLocation();

  async function signIn({ email, password }: SignInCredencials) {
    setIsSubmitting(true);

    try {
      const response = await authenticateService(email, password);

      const { result, error, success } = response.data;

      if (!success) {
        return addErrorNotification(String(error?.message));
      }

      setUser(result?.user as User);

      setCookie(undefined, STORAGE_KEY, result?.token as string, {
        maxAge: 60 * 60 * 24 * 30, // 30 days,
        path: "/",
      });

      api.defaults.headers["Authorization"] = `Bearer ${result.token}`;

      if (result?.user.hasConfirmedRegulation) {
        Router.push("/");
      } else {
        Router.push("/regulations");
      }
    } catch (error: any) {
      const err = error as ResponseError;

      addErrorNotification(
        err.response.data.error?.message || "Error during request in sign in."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function signUp(signUpData: SignUpCredencials) {
    const payload = {
      ...signUpData,
      latitude: location?.latitude,
      longitude: location?.longitude,
    };

    const response = await signupService(payload);

    const { result, error, success } = response.data;

    if (!success) {
      return addErrorNotification(String(error?.message));
    }

    setUser(result?.user as User);

    setCookie(undefined, STORAGE_KEY, result?.token as string, {
      maxAge: 60 * 60 * 24 * 30, // 30 days,
      path: "/",
    });

    api.defaults.headers["Authorization"] = `Bearer ${result.token}`;

    Router.push("/regulations");
  }

  async function signInWithGoogle() {
    await NextAuthSignIn("google");
  }

  const signOut = useCallback(async () => {
    setUser(null);
    destroyCookie(undefined, STORAGE_KEY);

    if (session) {
      await NextAuthSignOut();
    }

    authChannel?.postMessage("signOut");

    Router.replace("/login");
  }, [session]);

  useEffect(() => {
    const cookies = parseCookies();

    const token = cookies[STORAGE_KEY];

    if (token) {
      api
        .get("/me")
        .then((response) => {
          setUser(response.data.result);
        })
        .catch(() => signOut());
    }
  }, [signOut]);

  // useEffect(() => {
  //   async function loadGoogleSession() {
  //     if (session) {
  //       const sessionUser = {
  //         email: session.user?.email as string,
  //         avatar: session.user?.image as null,
  //         name: session.user?.name as string,
  //         provider: Provider.Google,
  //       };

  //       const hasUser = await api.get(`/users/email/${sessionUser.email}`);

  //       if (hasUser) return setUser({ ...hasUser, location });

  //       await createGoogleUserUseCase({ ...sessionUser, location });

  //       setUser(sessionUser);
  //     }
  //   }

  //   loadGoogleSession();
  // }, [session, location]);

  return {
    isAuthenticated: !!user,
    isSubmitting,
    user,
    setUser,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
  };
}
