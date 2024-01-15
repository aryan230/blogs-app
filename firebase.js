// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBQ0kKaTt7Z6WP4H8QEYszm_gv2dW2KSs",
  authDomain: "blogs-assign.firebaseapp.com",
  projectId: "blogs-assign",
  storageBucket: "blogs-assign.appspot.com",
  messagingSenderId: "707337358597",
  appId: "1:707337358597:web:cb4b96a0641dd8a4e97b6c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
export { auth, provider, db };
