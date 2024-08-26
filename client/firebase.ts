// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import dotenv from "dotenv";
dotenv.config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "mern-demo-21427.firebaseapp.com",
  projectId: "mern-demo-21427",
  storageBucket: "mern-demo-21427.appspot.com",
  messagingSenderId: "704063245767",
  appId: "1:704063245767:web:67b55fa264eb14f3831de2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage };