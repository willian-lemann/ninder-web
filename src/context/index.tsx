import { ReactNode } from "react";

import { ProviderComposer } from "./ProviderComposer";

import { AuthProvider } from "./auth";
import { ChatsProvider } from "./chat";
import { MessagesProvider } from "./messages";
import { UsersProvider } from "./users";
import { SocketProvider } from "./socket";

interface ProviderProps {
  children: ReactNode;
}

export const Provider = ({ children }: ProviderProps) => (
  <ProviderComposer
    with={[
      AuthProvider,
      SocketProvider,
      UsersProvider,
      ChatsProvider,
      MessagesProvider,
    ]}
  >
    {children}
  </ProviderComposer>
);
