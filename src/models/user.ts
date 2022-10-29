interface Location {
  latitude: number;
  longitude: number;
}
export interface User {
  id?: string;
  email: string;
  name: string;
  avatar?: Blob | null;
  bio?: string;
  hometown?: string;
  occupation?: string;
  nationality?: string;
  phone?: string;
  birthday?: Date | null;
  gender?: number | null;
  location?: Location | null;
  hasConfirmedRegulation?: boolean;
}
