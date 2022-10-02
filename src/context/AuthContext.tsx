import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";
import Router from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";

import { signInService } from "../services/auth/signInService";
import { User } from "../models/user";
import { getUserService } from "../services/user/getUserService";
import { signUpService } from "../services/auth/signUpService";
import { logoutService } from "../services/auth/logoutService";

interface InitialState {
  currentUser: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logOut: () => Promise<void>;
}

export const AuthContext = createContext({} as InitialState);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  async function signIn(email: string, password: string) {
    const userSigned = await signInService(email, password);

    if (!userSigned) {
      return;
    }

    const { token, user } = userSigned;

    setCookie(undefined, "@planning-five.token", token, {
      maxAge: 60 * 60 * 1,
    });

    setCurrentUser({
      avatar: user.photoURL,
      email,
      name: user.displayName,
      userId: user.uid,
    });

    Router.push("/");
  }

  async function signUp(email: string, password: string, name: string) {
    const user = await signUpService(email, password, name);

    if (!user) {
      return;
    }

    const { token, user: signupUser } = user;

    setCookie(undefined, "@planning-five.token", token, {
      maxAge: 60 * 60 * 1,
    });

    setCurrentUser({
      avatar: signupUser.avatar,
      email,
      name: signupUser.name,
      userId: signupUser.userId,
    });

    Router.push("/");
  }

  async function logOut() {
    await logoutService();
    setCurrentUser(null);
    destroyCookie(undefined, "@planning-five.token");

    Router.push("/login");
  }

  useEffect(() => {
    const { "@planning-five.token": token } = parseCookies();

    if (token) {
      // getUserService(currentUser?.userId as string).then((user) =>
      //   setCurrentUser(user)
      // );
    }
  }, [currentUser?.userId]);
  return (
    <AuthContext.Provider value={{ currentUser, signIn, signUp, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
