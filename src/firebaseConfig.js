
// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Firebase Authentication
import { getFirestore } from 'firebase/firestore'; // Firestore
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7hVzIyiBIS2zhN3ugj8DIeXJFX2gS_uc",
  authDomain: "sui-marketplace.firebaseapp.com",
  projectId: "sui-marketplace",
  storageBucket: "sui-marketplace.firebasestorage.app",
  messagingSenderId: "1010411236291",
  appId: "1:1010411236291:web:3df00caa79563c55fd6b76",
  measurementId: "G-DX85V5TDKY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const storage = getStorage(app);
export const firestore = getFirestore(app);
export { auth, db };







