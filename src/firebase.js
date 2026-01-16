import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCLQGt3PxfdkiZylFKxh12fecMX49OLQY",
  authDomain: "assist-star.firebaseapp.com",
  projectId: "assist-star",
  storageBucket: "assist-star.firebasestorage.app",
  messagingSenderId: "344037818458",
  appId: "1:344037818458:web:1a057379884f17fb839863",
  measurementId: "G-JKL1HD4S9K"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
