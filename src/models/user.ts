import { differenceInYears } from "date-fns";

interface Location {
  latitude: number;
  longitude: number;
}

export type User = Partial<{
  id: string;
  email: string;
  name: string;
  avatar: Blob | null | string;
  bio: string;
  hometown: string;
  occupation: string;
  nationality: string;
  phone: string;
  birthday: Date | null;
  gender: number | null;
  location: Location | null;
  hasConfirmedRegulation: boolean;
  favorites: string[];
  provider: number;
}>;
