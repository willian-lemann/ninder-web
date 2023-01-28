import { User } from "@data/models/user";

export interface RegisterForm extends Pick<User, "email" | "name" | "avatar"> {
  password: string;
  confirmPassword: string;
}
