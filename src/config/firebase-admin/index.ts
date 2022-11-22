import admin, { apps } from "firebase-admin";
import devServiceAccount from "./dev-service-account.json";
import prodServiceAccount from "./prod-service-account.json";

const devConfig = devServiceAccount as admin.ServiceAccount;
const prodConfig = prodServiceAccount as admin.ServiceAccount;

export const firebase = !apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(
        process.env.NODE_ENV === "production" ? prodConfig : devConfig
      ),
    })
  : admin.app();
