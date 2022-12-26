import { User } from "@data/entities/user";

export interface ResponseData {
  token: string;
  user: Partial<User>;
}
