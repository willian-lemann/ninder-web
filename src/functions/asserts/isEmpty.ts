export function isEmpty(value: string) {
  const regex = RegExp(/^(\w+\S+)$/);

  const isValid = regex.test(value);

  return !isValid;
}
