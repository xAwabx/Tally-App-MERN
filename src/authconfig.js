// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8FmCMabgtGHtCL5vwQ9cTSyYDxlViLK0",
  authDomain: "group-app-auth.firebaseapp.com",
  projectId: "group-app-auth",
  storageBucket: "group-app-auth.appspot.com",
  messagingSenderId: "562824793710",
  appId: "1:562824793710:web:410d7410124856dd92e07f",
  measurementId: "G-3EBZ6CE9SV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { provider, auth };
