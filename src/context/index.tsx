import { ReactNode } from "react";
import { AuthProvider } from "./auth";
import { ChatsProvider } from "./chat";

import { ProviderComposer } from "./ProviderComposer";

interface ProviderProps {
  children: ReactNode;
}

export const Provider = ({ children }: ProviderProps) => (
  <ProviderComposer with={[AuthProvider, ChatsProvider]}>
    {children}
  </ProviderComposer>
);
