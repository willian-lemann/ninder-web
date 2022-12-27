import { ReactNode } from "react";

import { AuthProvider } from "./auth";
import { ChatsProvider } from "./chat";
import { MessagesProvider } from "./messages";
import { ProviderComposer } from "./ProviderComposer";

interface ProviderProps {
  children: ReactNode;
}

export const Provider = ({ children }: ProviderProps) => (
  <ProviderComposer with={[AuthProvider, ChatsProvider, MessagesProvider]}>
    {children}
  </ProviderComposer>
);
