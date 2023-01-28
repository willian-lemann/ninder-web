import { RegisterForm } from "./RegisterForm";

export interface SignUpCredencials
  extends Omit<RegisterForm, "confirmPassword"> {}
