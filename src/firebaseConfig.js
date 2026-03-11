// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABGv8m5WO2iVWGO9T8QMLCKkhy3bp560o",
  authDomain: "alkaram-product.firebaseapp.com",
  databaseURL: "https://alkaram-product-default-rtdb.firebaseio.com",
  projectId: "alkaram-product",
  storageBucket: "alkaram-product.firebasestorage.app",
  messagingSenderId: "737393421683",
  appId: "1:737393421683:web:6256f0170b79d4d215a906",
  measurementId: "G-DV0H74XM2L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);