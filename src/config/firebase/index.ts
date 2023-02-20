import admin, { ServiceAccount } from "firebase-admin";
import serviceAccount from "./firebase-service-account.json";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount),
    });
  } catch (error: any) {
    console.log("Firebase admin initialization error", error.stack);
  }
}

export const storage = admin.storage();
