import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();
export { admin, db };

/*import { getStorage } from "firebase/storage";
export const storage = getStorage(admin);*/
