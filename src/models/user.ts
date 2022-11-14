import { differenceInYears } from "date-fns";
import { Timestamp } from "firebase/firestore";

interface Location {
  latitude: number;
  longitude: number;
}

export interface User {
  id?: string;
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
  provider?: number;
}

export function formatAge(birthday: any) {
  const age = differenceInYears(new Date(), birthday.toDate());
  return age;
}
