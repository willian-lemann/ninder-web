import { Timestamp } from "firebase/firestore";

export function getNow() {
  return Timestamp.fromDate(new Date());
}
