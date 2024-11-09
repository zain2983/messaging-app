// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Firestore if you're using it
import firebaseConfig from './firebaseConfig'; // Import config from separate file

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);  // Firebase Auth
const firestore = getFirestore(app); // Firestore (optional)

export { auth, firestore };
