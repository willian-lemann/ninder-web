import { createContext, ReactNode, useContext } from "react";

import { InitialState, useUserMessages } from "./useUserMessages";

const MessagesContext = createContext({} as InitialState);

interface MessagesProviderProps {
  children: ReactNode;
}

export const MessagesProvider = ({ children }: MessagesProviderProps) => {
  const { ...userMessagesData } = useUserMessages();

  return (
    <MessagesContext.Provider value={{ ...userMessagesData }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessagesContext = () => {
  const context = useContext(MessagesContext);
  return context;
};
