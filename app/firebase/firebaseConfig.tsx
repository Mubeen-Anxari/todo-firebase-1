import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDXXzen9ivS4Zpyh0U91ng2BYy0vxpTPkg",
  authDomain: "todo-firebase-app-1.firebaseapp.com",
  projectId: "todo-firebase-app-1",
  storageBucket: "todo-firebase-app-1.appspot.com",
  messagingSenderId: "516643552933",
  appId: "1:516643552933:web:1492f8f89229e433a5d74c"
};

const app = initializeApp(firebaseConfig);
export const auth =getAuth()
export const db =getFirestore(app)
export default app