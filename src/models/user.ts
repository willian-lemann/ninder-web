import { differenceInYears } from "date-fns";

interface Location {
  latitude: number;
  longitude: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: Blob | null | string;
  bio?: string;
  hometown?: string;
  occupation?: string;
  nationality?: string;
  phone?: string;
  birthday?: Date | null;
  gender?: number | null;
  location?: Location | null;
  hasConfirmedRegulation?: boolean;
  favorites?: string[];
  provider?: number;
}

export function formatAge(birthday: any) {
  const age = differenceInYears(new Date(), birthday.toDate());
  return age;
}

export function getGender(genderEnum: number) {
  const genderBasedOnEnum = {
    1: "Male",
    2: "Female",
  };

  return (
    genderBasedOnEnum[genderEnum as keyof typeof genderBasedOnEnum] ||
    "Other gender"
  );
}
