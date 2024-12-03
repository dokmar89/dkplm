import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD18bBpRgOZZJAHsGKDdRa7lUHdhl71RcI",
  authDomain: "ageverificationservice.firebaseapp.com",
  projectId: "ageverificationservice",
  storageBucket: "ageverificationservice.firebasestorage.app",
  messagingSenderId: "587819983449",
  appId: "1:587819983449:web:ece6da04c22e476b2a0748",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Replace these with your Firebase user details
const ADMIN_UID = 'YOUR_USER_UID'; // Get this from Firebase Authentication
const ADMIN_EMAIL = 'YOUR_EMAIL'; // Your email

async function makeAdmin() {
  try {
    const userData = {
      uid: ADMIN_UID,
      email: ADMIN_EMAIL,
      role: {
        type: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await setDoc(doc(db, 'users', ADMIN_UID), userData);
    console.log('Successfully created admin user!');
  } catch (error) {
    console.error('Error creating admin:', error);
  }
}

makeAdmin();
