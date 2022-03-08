// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/compat/app";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1HvdjGj-ag-WaUR0gsmQrBE7nk5ArMC0",
  authDomain: "reactnativetutorial-cf629.firebaseapp.com",
  projectId: "reactnativetutorial-cf629",
  storageBucket: "reactnativetutorial-cf629.appspot.com",
  messagingSenderId: "84862577694",
  appId: "1:84862577694:web:a4d46a6741be0a9fb3920f"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ experimentalForceLongPolling: true });
