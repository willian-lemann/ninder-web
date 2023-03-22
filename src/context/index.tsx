import { ReactNode } from "react";

import { ProviderComposer } from "./ProviderComposer";

import { AuthProvider } from "./auth";
import { ChatsProvider } from "./chat";
import { MessagesProvider } from "./messages";

interface ProviderProps {
  children: ReactNode;
}

export const Provider = ({ children }: ProviderProps) => (
  <ProviderComposer with={[AuthProvider, ChatsProvider, MessagesProvider]}>
    {children}
  </ProviderComposer>
);
