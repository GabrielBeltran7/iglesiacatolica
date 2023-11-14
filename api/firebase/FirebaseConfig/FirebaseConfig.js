import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getStorage  } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyIKCadGNtY37wkA_Er4wqGh0QTVQoRQk",
  authDomain: "hjnserc-64c72.firebaseapp.com",
  projectId: "hjnserc-64c72",
  storageBucket: "hjnserc-64c72.appspot.com",
  messagingSenderId: "642393736815",
  appId: "1:642393736815:web:0671ffeba4573a2749ef9a",
  measurementId: "G-NPJLQ7DQ79"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const db = getFirestore(app);
const  storage = getStorage(app)


export { app, auth, db, storage,  };

