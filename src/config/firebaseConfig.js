// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmjENiBcysNIcAsbps8gAfyMA9T9tG-cc",
  authDomain: "prueba-tecnica-gdg.firebaseapp.com",
  projectId: "prueba-tecnica-gdg",
  storageBucket: "prueba-tecnica-gdg.appspot.com",
  messagingSenderId: "599511771260",
  appId: "1:599511771260:web:c1de26b69ef5182a2301f9",
  measurementId: "G-JS6ZNK9XZ8"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//const googleAuthProvider = new firebase.auth().GoogleAuthProvider()
const auth = getAuth();
const provider = new GoogleAuthProvider();
//const db = getFirestore();

export {app,auth,provider,analytics}//, googleAuthProvider, analytics, auth}