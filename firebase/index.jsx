"use client"

import { useState, useEffect } from 'react'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5DcDMc6H2cgUkeqM4EPbjrlF_efZzels",
  authDomain: "i3de-ab3a5.firebaseapp.com",
  databaseURL: "https://i3de-ab3a5-default-rtdb.firebaseio.com",
  projectId: "i3de-ab3a5",
  storageBucket: "i3de-ab3a5.appspot.com",
  messagingSenderId: "117797853995",
  appId: "1:117797853995:web:df445841b1cdffa964c36e",
  measurementId: "G-JFX97S6N8W"
};

// Initialize Firebase
export default function useFirebase() {
    const [init, setInit] = useState(null)
    const [storage, setStorage] = useState(null)
    


    useEffect(() => {
      if(typeof window !== 'undefined'){

        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        const store = getStorage(app)
        setStorage(store)
      }
    }, [])

    return {
      STORAGE : storage
    }
}