import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD4x4hNbtiPq21IypD1ZDhuyYSbqut-tXs",
    authDomain: "teamshot-aac7a.firebaseapp.com",
    projectId: "teamshot-aac7a",
    storageBucket: "teamshot-aac7a.appspot.com",
    messagingSenderId: "1050581247793",
    appId: "1:1050581247793:web:306c4e3bc3f3ab65e8f210",
    measurementId: "G-6Y0E6L5JSH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default db;