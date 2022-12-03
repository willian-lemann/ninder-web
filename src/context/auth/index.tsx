import { createContext, ReactNode, useContext } from "react";
import { SessionContext } from "next-auth/react";

import { InitialState, useAuth } from "./useAuth";

const AuthContext = createContext({} as InitialState);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { ...auth } = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);

export const useGoogleContext = () => {
  const context = useContext(SessionContext);

  return {
    session: context?.data,
  };
};
