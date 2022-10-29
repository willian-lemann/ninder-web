import { User } from "@models/user";

export interface RegisterForm extends Omit<User, "id"> {
  password: string;
  confirmPassword: string;
}
