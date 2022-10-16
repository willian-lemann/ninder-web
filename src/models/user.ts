interface Location {
  latitude: number;
  longitude: number;
}
export interface User {
  id?: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  hometown?: string;
  occupation?: string;
  nationality?: string;
  phone?: string;
  birthday?: string;
  gender?: string;
  location?: Location | null;
  hasConfirmedRegulation?: boolean;
}
