import React, { useContext, useEffect, useState } from "react";
import { auth, googleProvider, fbProvider } from "../firebase";
import { Link, useHistory } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  function signInWithGoogle() {
    return auth.signInWithRedirect(googleProvider);
  }

  function signInWithFacebook() {
    return auth.signInWithRedirect(fbProvider);
  }

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function updatePhotoUrl() {
    return currentUser.updateProfile({
      displayName: "Unspalsh Man!",
      photoURL:
        "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    });
  }

  function handleProfileDelete() {
    return currentUser.delete();
  }

  // useEffect(() => {
  //   if (currentUser) {
  //   }
  // }, [currentUser]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Current user is", user);
      if (user) history.push("/");
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signInWithGoogle,
    signInWithFacebook,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updatePhotoUrl,
    handleProfileDelete,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      {loading && <h1>Loading...</h1>}
    </AuthContext.Provider>
  );
};
