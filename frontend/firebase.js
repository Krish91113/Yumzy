// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { get } from "mongoose";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "yumzyfooddelivery.firebaseapp.com",
  projectId: "yumzyfooddelivery",
  storageBucket: "yumzyfooddelivery.firebasestorage.app",
  messagingSenderId: "733455471084",
  appId: "1:733455471084:web:1d4c19eac5af72bd6af0c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export {app, auth};