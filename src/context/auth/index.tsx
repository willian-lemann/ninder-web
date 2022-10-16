import { STORAGE_KEY } from "@constants/auth";
import { getUserService } from "@services/user/getUserService";
import { parseCookies } from "nookies";
import { createContext, ReactNode, useContext, useEffect } from "react";

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
