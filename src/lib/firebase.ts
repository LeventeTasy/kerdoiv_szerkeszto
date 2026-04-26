// ==========================================
// Firebase Konfiguráció
// ==========================================
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

// Firebase konfiguráció környezeti változókból vagy fallback értékekkel
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDjj8X9H95E6eeup8JDHzpFA4B-8mydPWk",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "kerdoivszerkeszto.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "kerdoivszerkeszto",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "kerdoivszerkeszto.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "751890111671",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:751890111671:web:0198b34c44e813e67f4132",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-2X31T0B907",
};

// Firebase App inicializálás
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Firestore adatbázis
const db: Firestore = getFirestore(app);

// Analytics inicializálás (csak kliens oldalon)
let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, db, analytics };
