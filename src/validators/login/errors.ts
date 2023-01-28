import { RegisterForm } from "@dtos/login/RegisterForm";

export type Errors = Record<
  keyof Omit<
    RegisterForm,
    "hasConfirmedRegulation" | "location" | "provider" | "favorites"
  >,
  null
>;

export type ErrorType = {
  [key: string]: string;
};

export const errors: Errors = {
  email: null,
  name: null,
  avatar: null,
  password: null,
  confirmPassword: null,
};
