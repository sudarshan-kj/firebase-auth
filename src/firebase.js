import firebase from "firebase/app";
import "firebase/auth";

// const app = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// });
//dummy comment to check the auth flow

const app = firebase.initializeApp({
  apiKey: "AIzaSyBD_GjdMelNfjRTTqTwzJm_O84q5hzLHSc",
  authDomain: "auth-react-dev-40571.firebaseapp.com",
  projectId: "auth-react-dev-40571",
  storageBucket: "auth-react-dev-40571.appspot.com",
  messagingSenderId: "255467773521",
  appId: "1:255467773521:web:8526c56945a61b288da270",
});

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const fbProvider = new firebase.auth.FacebookAuthProvider();

export const auth = app.auth();
export default app;
