import { STORAGE_KEY } from "@constants/login/auth";
import { setCookie } from "nookies";

export function saveToStorageGateway(value: string) {
  setCookie(undefined, STORAGE_KEY, value, {
    maxAge: 60 * 60 * 24 * 30, // 30 days,
    path: "/",
  });
}
