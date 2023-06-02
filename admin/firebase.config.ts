import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { FIREBASE_ENV } from "./src/configs";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDbQ1rMav1AIPKJSfy5B60J4H2xPmBE9MI",
  authDomain: "e-commerce-images-store.firebaseapp.com",
  projectId: "e-commerce-images-store",
  storageBucket: "e-commerce-images-store.appspot.com",
  messagingSenderId: "313806439384",
  appId: "1:313806439384:web:6981756bb5bab6bb3268ad",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
