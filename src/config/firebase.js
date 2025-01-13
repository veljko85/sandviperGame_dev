// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcUy68eUxYxCwpwUtdVrF1Zyhn23PcB14",
  authDomain: "sandviper-game.firebaseapp.com",
  projectId: "sandviper-game",
  storageBucket: "sandviper-game.appspot.com",
  messagingSenderId: "360391384155",
  appId: "1:360391384155:web:1387398da1905cfcd9b37e",
  measurementId: "G-H79G0BD71W",
  databaseURL: "https://sandviper-game-default-rtdb.europe-west1.firebasedatabase.app", // Updated URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)

export const database = getDatabase(app);