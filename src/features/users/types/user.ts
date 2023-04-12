export type User = {
  id?: string;
  email: string;
  name: string;
  avatar?: string | null;
  bio?: string | null;
  hometown?: string | null;
  occupation?: string | null;
  nationality?: string | null;
  phone?: string | null;
  birthday?: Date | null;
  gender?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  hasConfirmedRegulation: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  distanceAway?: number;
};
