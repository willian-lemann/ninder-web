import { User } from "@models/user";

export interface ResponseData {
  token: string;
  user: Partial<User>;
}
