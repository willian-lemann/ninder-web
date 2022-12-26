import { User } from "@data/entities/user";

export interface RegisterForm extends Omit<User, "id"> {
  email: string;
  password: string;
  confirmPassword: string;
}
