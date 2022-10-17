import { User } from "@models/user";

export interface SignUpCredencials extends Omit<User, "id"> {
  password: string;
  confirmPassword: string;
}
