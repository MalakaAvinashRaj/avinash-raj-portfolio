import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Replace these with your Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyC1Xkw4tmN2Qb4y_cnK8dE7Z9NzHDow228",
    authDomain: "portfolio-f1b73.firebaseapp.com",
    projectId: "portfolio-f1b73",
    storageBucket: "portfolio-f1b73.firebasestorage.app",
    messagingSenderId: "483553026285",
    appId: "1:483553026285:web:8899c70486259635f5ece4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
