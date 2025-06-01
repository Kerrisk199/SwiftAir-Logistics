// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  setDoc,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCi2t3tsV_Mk68HJHM7W1gIN1gC4WLvNQw",
  authDomain: "swift-air-logistics.firebaseapp.com",
  projectId: "swift-air-logistics",
  storageBucket: "swift-air-logistics.appspot.com",
  messagingSenderId: "154606732287",
  appId: "1:154606732287:web:c6218f81c4f0b353ed9dca",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Firestore collection reference
const trackingCollection = collection(db, "tracking");

// Admin-only: Create or update tracking detail by tracking number (document ID)
export const setTrackingDetails = async (trackingNumber, data) => {
  try {
    const docRef = doc(db, "tracking", trackingNumber);
    await setDoc(docRef, data, { merge: true });
  } catch (error) {
    console.error("Error setting tracking details:", error);
    throw error;
  }
};

// Admin + frontend: Get tracking detail by tracking number
export const getTrackingDetails = async (trackingNumber) => {
  try {
    const docRef = doc(db, "tracking", trackingNumber);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return { error: "Tracking number not found." };
    }
    return { id: docSnap.id, ...docSnap.data() };
  } catch (error) {
    console.error("Error fetching tracking details:", error);
    return { error: "Failed to fetch tracking details." };
  }
};

// Admin-only: Delete tracking detail
export const deleteTrackingDetails = async (trackingNumber) => {
  try {
    const docRef = doc(db, "tracking", trackingNumber);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting tracking detail:", error);
    throw error;
  }
};

// Admin-only: Update Chinese translation fields for a tracking detail
export const updateTrackingChineseFields = async (trackingNumber, chineseFields) => {
  try {
    const docRef = doc(db, "tracking", trackingNumber);
    await updateDoc(docRef, chineseFields);
    console.log("Chinese fields updated:", chineseFields);
  } catch (error) {
    console.error("Error updating Chinese fields:", error);
    throw error;
  }
};

export { db, storage };
