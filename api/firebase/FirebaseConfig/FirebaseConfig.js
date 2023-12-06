



import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getStorage  } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const db = getFirestore(app);
const  storage = getStorage(app)


export { app, auth, db, storage,  };

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// import { getStorage  } from 'firebase/storage';

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAyIKCadGNtY37wkA_Er4wqGh0QTVQoRQk",
//   authDomain: "hjnserc-64c72.firebaseapp.com",
//   projectId: "hjnserc-64c72",
//   storageBucket: "hjnserc-64c72.appspot.com",
//   messagingSenderId: "642393736815",
//   appId: "1:642393736815:web:0671ffeba4573a2749ef9a",
//   measurementId: "G-NPJLQ7DQ79"
// };
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app); 
// const db = getFirestore(app);
// const  storage = getStorage(app)


// export { app, auth, db, storage,  };

