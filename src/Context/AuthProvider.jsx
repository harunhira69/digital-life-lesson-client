import React, { useEffect, useState } from 'react';

import { createUserWithEmailAndPassword,GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import { AuthContext } from './AuthContext';



const AuthProvider = ({children}) => {

    const[user,setUser] = useState(null);
    const[loading,setLoading]= useState(true);
     const googleProvider = new GoogleAuthProvider();


    // create user with email
    const createUserEmail = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    // sign in user
    const signIn = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    // google sign in
 const handleGoogle = ()=>{
    setLoading(true)
    return signInWithPopup(auth,googleProvider)
 }

 const handleSignOut = ()=>{
    return signOut(auth)
 }


 const updateUserProfile = (profile)=>{
    return updateProfile(auth.currentUser,profile)
 }

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

    if (currentUser?.email) {
      try {
        // ✅ fetch role from backend
        const res = await fetch(
          `http://localhost:3000/users/role/${currentUser.email}`
        );
        const data = await res.json();

        setUser({
          ...currentUser,
          role: data.role, // ✅ Inject role here
        });
      } catch (error) {
        console.error("Failed to fetch user role", error);
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
        createUserEmail,
        signIn,
        handleGoogle,
        user,
        loading,
        handleSignOut,
        updateUserProfile

    }
    return (
   <AuthContext.Provider value={authInfo}>
        {children}
   </AuthContext.Provider>
    );
};

export default AuthProvider;