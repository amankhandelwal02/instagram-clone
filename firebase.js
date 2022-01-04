// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfJWiyF5B7wWM74KmTHmFaiCb8fDtof4Q",
  authDomain: "instagram-clone-2a432.firebaseapp.com",
  projectId: "instagram-clone-2a432",
  storageBucket: "instagram-clone-2a432.appspot.com",
  messagingSenderId: "323859548478",
  appId: "1:323859548478:web:83d1e171e4fd6daa59446f"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();

export { app, db, storage };