// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdWzs0ofbeT4mLHAyJuUcksHv3pssRKDo",
  authDomain: "mytrip-697d0.firebaseapp.com",
  projectId: "mytrip-697d0",
  storageBucket: "mytrip-697d0.appspot.com",
  messagingSenderId: "372842738469",
  appId: "1:372842738469:web:b31d0514c6ff90751760cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export { app };

