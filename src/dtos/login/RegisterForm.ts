import { User } from "@models/user";

export interface RegisterForm extends Omit<User, "id"> {
  email: string;
  password: string;
  confirmPassword: string;
}
