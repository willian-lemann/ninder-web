import { differenceInYears } from "date-fns";

export function formatAge(birthday: any) {
  const age = differenceInYears(new Date(), birthday.toDate());
  return age;
}
