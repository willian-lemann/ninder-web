import { useAuthContext } from "@context/auth";
import { createContext, ReactNode, useContext } from "react";

import { ContextParams, useUserChats } from "./useUserChats";

const ChatsContext = createContext({} as ContextParams);

interface ChatsProviderProps {
  children: ReactNode;
}

export function ChatsProvider({ children }: ChatsProviderProps) {
  const { ...chatsData } = useUserChats();

  return (
    <ChatsContext.Provider value={{ ...chatsData }}>
      {children}
    </ChatsContext.Provider>
  );
}

export const useChatsContext = () => {
  return useContext(ChatsContext);
};
