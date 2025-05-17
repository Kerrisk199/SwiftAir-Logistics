// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCi2t3tsV_Mk68HJHM7W1gIN1gC4WLvNQw",
  authDomain: "swift-air-logistics.firebaseapp.com",
  projectId: "swift-air-logistics",
  storageBucket: "swift-air-logistics.firebasestorage.app",
  messagingSenderId: "154606732287",
  appId: "1:154606732287:web:c6218f81c4f0b353ed9dca",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore instance
const db = getFirestore(app);

export { db };
