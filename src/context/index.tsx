import { ReactNode } from "react";
import { AuthProvider } from "./auth";
import { ProviderComposer } from "./ProviderComposer";
import { UsersProvider } from "./users";
interface ProviderProps {
  children: ReactNode;
}

export const Provider = ({ children }: ProviderProps) => (
  <ProviderComposer with={[AuthProvider, UsersProvider]}>
    {children}
  </ProviderComposer>
);
