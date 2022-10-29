import { RegisterForm } from "./RegisterForm";

export interface UserInformationForm
  extends Pick<
    RegisterForm,
    "name" | "email" | "hometown" | "occupation" | "bio" | "avatar"
  > {}
