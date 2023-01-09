import { NextApiResponse } from "next";

type Error = {
  message: string;
};

interface Result<T> {
  success?: boolean;
  error?: Error | null;
  result?: T | null | any;
}

export function createApiResponse<T>({
  success = true,
  error = null,
  result,
}: Result<T>) {
  const resultObj: Result<T> = {
    success,
    error,
    result,
  };

  return resultObj;
}
