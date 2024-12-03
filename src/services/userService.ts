import { 
  doc, 
  getDoc, 
  setDoc, 
  collection,
  query,
  where,
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { User as FirebaseUser } from 'firebase/auth';

export interface UserRole {
  type: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

export interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: UserRole;
  company?: string;
  contactPerson?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export const createUserDocument = async (
  firebaseUser: FirebaseUser,
  role: UserRole['type'] = 'user'
) => {
  if (!firebaseUser) return;

  const userRef = doc(db, 'users', firebaseUser.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const userData: UserData = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      role: {
        type: role,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await setDoc(userRef, userData);
    return userData;
  }

  return userSnap.data() as UserData;
};

export const getUserData = async (uid: string): Promise<UserData | null> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return null;
    }

    return userSnap.data() as UserData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

export const isUserAdmin = async (uid: string): Promise<boolean> => {
  try {
    const userData = await getUserData(uid);
    return userData?.role.type === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

// Function to create the first admin user - should be called only once during setup
export const createInitialAdmin = async (email: string, uid: string) => {
  try {
    // Check if any admin exists
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('role.type', '==', 'admin'));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      throw new Error('Admin user already exists');
    }

    // Create the first admin user
    const adminData: UserData = {
      uid,
      email,
      displayName: 'Admin',
      role: {
        type: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await setDoc(doc(db, 'users', uid), adminData);
    return adminData;
  } catch (error) {
    console.error('Error creating initial admin:', error);
    throw error;
  }
};
