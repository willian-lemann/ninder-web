import { ReactNode } from "react";
import { AuthProvider } from "./auth";
import { ProviderComposer } from "./ProviderComposer";

interface ProviderProps {
  children: ReactNode;
}

export const Provider = ({ children }: ProviderProps) => (
  <ProviderComposer with={[AuthProvider]}>{children}</ProviderComposer>
);
