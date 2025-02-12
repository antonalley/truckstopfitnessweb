import * as admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN as string);

var app = null;
if (admin.apps.length > 0) {
  app = admin.app();
} else {
  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const db = app.firestore();
export const auth = app.auth();
