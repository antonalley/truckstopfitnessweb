// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-ExXW9DHZ9hldObleZBqPAV48UtB_NUg",
  authDomain: "truck-stop-fitness.firebaseapp.com",
  projectId: "truck-stop-fitness",
  storageBucket: "truck-stop-fitness.firebasestorage.app",
  messagingSenderId: "25002929423",
  appId: "1:25002929423:web:8ffc959085cdf72b05a27a",
  measurementId: "G-MDX2BCW7DJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
