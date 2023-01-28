export type User = {
  id?: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  hometown: string;
  occupation?: string;
  nationality?: string;
  phone?: string;
  birthday?: Date;
  gender?: number;
  latitude?: number;
  longitude?: number;
  hasConfirmedRegulation: boolean;
  provider: number;
  createdAt?: Date;
  updatedAt?: Date;
};
