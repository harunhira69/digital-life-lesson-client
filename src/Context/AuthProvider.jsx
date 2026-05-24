import React, { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword, GoogleAuthProvider,
  onAuthStateChanged, signInWithEmailAndPassword,
  signInWithPopup, signOut, updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import { AuthContext } from './AuthContext';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const createUserEmail = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const handleGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const handleSignOut = () => signOut(auth);
  const updateUserProfile = (profile) => updateProfile(auth.currentUser, profile);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        try {
          const res = await fetch(`${BASE_URL}/users/role/${currentUser.email}`);
          const data = await res.json();
          setUser({ ...currentUser, role: data.role || 'Free' });
        } catch (error) {
          console.error('Failed to fetch user role', error);
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    createUserEmail, signIn, handleGoogle,
    user, loading, handleSignOut, updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;