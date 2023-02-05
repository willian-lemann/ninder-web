import { ReactNode } from "react";

import { ProviderComposer } from "./ProviderComposer";

import { AuthProvider } from "./auth";
import { ChatsProvider } from "./chat";
import { MessagesProvider } from "./messages";
import { UsersProvider } from "./users";

interface ProviderProps {
  children: ReactNode;
}

export const Provider = ({ children }: ProviderProps) => (
  <ProviderComposer
    with={[AuthProvider, UsersProvider, ChatsProvider, MessagesProvider]}
  >
    {children}
  </ProviderComposer>
);
