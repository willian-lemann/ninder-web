interface CreateResult<T> {
  error?: string | null;
  result: T;
  success?: boolean;
}

export function createResult<T>({
  error,
  result,
  success = true,
}: CreateResult<T>) {
  return {
    error,
    success,
    result,
  };
}
