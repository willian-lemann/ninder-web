import { RegisterForm } from "./RegisterForm";

export type UserProfileForm = Pick<
  RegisterForm,
  | "nationality"
  | "phone"
  | "birthday"
  | "gender"
  | "password"
  | "confirmPassword"
>;
