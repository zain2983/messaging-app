// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Firebase Authentication
import { getFirestore } from 'firebase/firestore'; // Firestore (if you plan to use it)
import { getStorage } from 'firebase/storage'; // Firebase Storage (if you plan to use it)

// Your Firebase configuration (Use the one you shared earlier)
const firebaseConfig = {
  apiKey: "AIzaSyBehKuVN6TuxnDc2fTtbQPIrFhZDTSJ5kQ",
  authDomain: "messaging-app-128f0.firebaseapp.com",
  projectId: "messaging-app-128f0",
  storageBucket: "messaging-app-128f0.firebasestorage.app",
  messagingSenderId: "879699192787",
  appId: "1:879699192787:web:30924ec1c8c95861115d26",
  measurementId: "G-ZY8Y4534ZT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
const auth = getAuth(app);

// Initialize Firestore (Optional: If you plan to use Firestore for storing messages)
const db = getFirestore(app);

// Initialize Firebase Storage (Optional: If you plan to store media files like images, etc.)
const storage = getStorage(app);

// Export the auth, db, and storage objects for use in other parts of your app
export { auth, db, storage };
