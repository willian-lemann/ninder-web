import { firestore } from "@config/firebase";
import { User } from "@data/entities/user";
import { getByEmailGateway } from "@data/gateways/user/get-by-email-gateway";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export async function getByEmailUseCase(email: string) {
  return await getByEmailGateway(email);
}
