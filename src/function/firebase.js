import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBRq_WBVuy6DzGcIlR_R8nFkN-KvFJhyBA",
  authDomain: "tasks-list-e3187.firebaseapp.com",
  projectId: "tasks-list-e3187",
  storageBucket: "tasks-list-e3187.appspot.com",
  messagingSenderId: "963333562943",
  appId: "1:963333562943:web:3bbe3f006c51e6904c8e8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
