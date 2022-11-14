import { User } from "@models/user";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
