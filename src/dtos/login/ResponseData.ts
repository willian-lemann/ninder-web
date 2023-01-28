import { User } from "@data/models/user";

export interface ResponseData {
  token: string;
  user: Partial<User>;
}
