// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7WZ2vJsfANXPn_fgVdTfX-fzXr2eId_I",
  authDomain: "digital-life-lesson-17d2b.firebaseapp.com",
  projectId: "digital-life-lesson-17d2b",
  storageBucket: "digital-life-lesson-17d2b.firebasestorage.app",
  messagingSenderId: "293200089774",
  appId: "1:293200089774:web:6871bca4e21fb9ab75933f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
