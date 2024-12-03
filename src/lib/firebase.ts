import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD18bBpRgOZZJAHsGKDdRa7lUHdhl71RcI",
  authDomain: "ageverificationservice.firebaseapp.com",
  projectId: "ageverificationservice",
  storageBucket: "ageverificationservice.firebasestorage.app",
  messagingSenderId: "587819983449",
  appId: "1:587819983449:web:ece6da04c22e476b2a0748",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
  } else if (err.code === 'unimplemented') {
    console.warn('The current browser does not support offline persistence.');
  }
});

export default app;