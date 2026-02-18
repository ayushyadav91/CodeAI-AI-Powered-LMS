// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkJatUoQCnxhfXwdxSANvlJsCjTlZYxVs",
  authDomain: "codeai-login-with.firebaseapp.com",
  projectId: "codeai-login-with",
  storageBucket: "codeai-login-with.firebasestorage.app",
  messagingSenderId: "256839630516",
  appId: "1:256839630516:web:1806f6fe461850eec5e1e1",
  measurementId: "G-SY0Y5SQJ6V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth,provider}

