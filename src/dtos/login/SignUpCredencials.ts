import { User } from "@models/user";
export interface SignUpCredencials
  extends Omit<User, "id" | "location" | "hasConfirmedRegulation"> {
  password: string;
  confirmPassword: string;
}
