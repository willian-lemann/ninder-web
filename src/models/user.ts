interface Location {
  latitude: number;
  longitude: number;
}
export interface User {
  id?: string;
  email: string;
  name: string;
  avatar?: string;
  hasConfirmedRegulation?: boolean;
  bio?: string;
  hometown?: string;
  occupation?: string;
  location?: Location | null;
  phone?: string;
  birthday?: string;
  gender?: string;
  nationality?: string;
}
