import { createContext, ReactNode, useContext, useEffect } from "react";
import { SessionContext } from "next-auth/react";

import { InitialState, useUsers } from "./useUsers";

const UsersContext = createContext({} as InitialState);

interface UsersProviderProps {
  children: ReactNode;
}

export function UsersProvider({ children }: UsersProviderProps) {
  const { ...usersContext } = useUsers();

  return (
    <UsersContext.Provider value={usersContext}>
      {children}
    </UsersContext.Provider>
  );
}

export const useUsersContext = () => useContext(UsersContext);
