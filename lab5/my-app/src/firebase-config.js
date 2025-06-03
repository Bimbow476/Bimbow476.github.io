import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDczfpfuziHfIJhkV44lym2ec7t4fadAy8",
  authDomain: "golenya476.firebaseapp.com",
  projectId: "golenya476",
  storageBucket: "golenya476.appspot.com",
  messagingSenderId: "477758644493",
  appId: "1:477758644493:web:3153bc9ced6a92d33f1044",
  measurementId: "G-5PNGC395H4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };