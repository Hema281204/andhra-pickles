import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7Er2LsjaY-mjK1r250UsjP5JvYoMJOk4",
  authDomain: "andhra-pickles.firebaseapp.com",
  projectId: "andhra-pickles",
  storageBucket: "andhra-pickles.firebasestorage.app",
  messagingSenderId: "473548518805",
  appId: "1:473548518805:web:9a6daf942a42878b8d729c"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);