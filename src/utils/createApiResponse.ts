import { NextApiResponse } from "next";
import { User } from "../models";

export type ResponseAuthType = { token: string; user: User };

type Error = {
  message: string;
};

export interface Result<T> {
  success?: boolean;
  error?: Error | null;
  result?: T | null;
}

export function createApiResponse<T>({
  success = true,
  error = null,
  result = null,
}: Result<T>) {
  const resultObj: Result<T> = {
    success,
    error,
    result,
  };

  return resultObj;
}
