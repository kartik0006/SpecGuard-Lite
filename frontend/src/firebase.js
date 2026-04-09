import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADzl-82AmL-3YtjWtnB0yvGx3N1DpU9UE",
  authDomain: "specguard-lite.firebaseapp.com",
  projectId: "specguard-lite",
  storageBucket: "specguard-lite.firebasestorage.app",
  messagingSenderId: "481307781970",
  appId: "1:481307781970:web:d3ce647a06b7a61475a88b",
  measurementId: "G-0GM5W5C136"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);