import admin, { ServiceAccount } from "firebase-admin";

import serviceAccount from "../../service-key/service-key.json";
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

export { app }    ;
