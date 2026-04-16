import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, addDoc, query, where, getDocs, orderBy, limit, Timestamp } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

// Tera Firebase Config - Jo tune diya
const firebaseConfig = {
  apiKey: "AIzaSyB4bz_8fGhrCqyyV-N_pA7s7dzVMKIPn_w",
  authDomain: "theatharvacapital-trading.firebaseapp.com",
  projectId: "theatharvacapital-trading",
  storageBucket: "theatharvacapital-trading.firebasestorage.app",
  messagingSenderId: "644668465681",
  appId: "1:644668465681:web:77575a3b001f00725007b0",
  measurementId: "G-0HNT3M1VGS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  virtualBalance: number;
  totalPnL: number;
  totalTrades: number;
  winningTrades: number;
  createdAt: Date;
}

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName!,
        photoURL: user.photoURL || undefined,
        virtualBalance: 10000,
        totalPnL: 0,
        totalTrades: 0,
        winningTrades: 0,
        createdAt: new Date()
      };
      await setDoc(userRef, userProfile);
    }
    
    return user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const userRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userRef);
  return userDoc.exists() ? userDoc.data() as UserProfile : null;
};

export const updateBalance = async (uid: string, newBalance: number) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, { virtualBalance: newBalance });
};

export const saveOrder = async (uid: string, order: any) => {
  const ordersRef = collection(db, `users/${uid}/orders`);
  return await addDoc(ordersRef, {
    ...order,
    createdAt: Timestamp.now(),
    status: 'OPEN'
  });
};
