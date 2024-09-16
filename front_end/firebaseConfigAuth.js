// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
export const auth = getAuth(app);







// const auth = getAuth(app);
// export { app, auth };



