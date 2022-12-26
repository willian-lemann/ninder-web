export function isEmptyString(value: string) {
  const regex = RegExp(/^\s*$/);

  const isValid = regex.test(value);

  return isValid;
}
