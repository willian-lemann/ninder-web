import { createContext, ReactNode, useContext } from "react";

export { useUserDetails } from "./useUserDetails";
export { useUsers } from "./useUsers";

import { UsersContextParams, useUsers } from "./useUsers";
interface UsersProviderProps {
  children: ReactNode;
}

const UsersContext = createContext({} as UsersContextParams);

export const UsersProvider = ({ children }: UsersProviderProps) => {
  const usersContext = useUsers();

  return (
    <UsersContext.Provider value={{ ...usersContext }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = () => useContext(UsersContext);
