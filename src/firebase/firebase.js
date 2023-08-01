// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAutnE2ezDOaOecAqXQNjxz2y4u1HaFHXY",
  authDomain: "mini-sale-manager.firebaseapp.com",
  projectId: "mini-sale-manager",
  storageBucket: "mini-sale-manager.appspot.com",
  messagingSenderId: "752432956153",
  appId: "1:752432956153:web:7dfe3ad56bbbf4a5c95828",
  measurementId: "G-GGHZ1FKWY9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
