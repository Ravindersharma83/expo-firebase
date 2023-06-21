// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtFjbFbpM6qTmprD1Va500Zkqbf6jDB1M",
  authDomain: "expofirebase-14c19.firebaseapp.com",
  projectId: "expofirebase-14c19",
  storageBucket: "expofirebase-14c19.appspot.com",
  messagingSenderId: "105299560561",
  appId: "1:105299560561:web:53affc8677d7f08b4333d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);