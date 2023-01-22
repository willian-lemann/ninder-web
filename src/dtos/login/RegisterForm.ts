import { User } from "@data/entities/user";

export interface RegisterForm
  extends Pick<
    User,
    "email" | "name" | "avatar" | "password" | "latitude" | "longitude"
  > {
  confirmPassword: string;
}
