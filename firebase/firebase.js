"use client"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database'
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth'

import { useState, useEffect } from "react";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
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
export default function useFirebase(){

  const [Database, setDatabase] = useState(null)
  const [Analytics, setAnalytics] = useState(null)
  const [Storages, setStorages] = useState(null)
  const [Auth, setAuth] = useState(null)

  

  useEffect(() => {
    console.log('ville')
    if(typeof window !== 'undefined'){
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
      const database = getDatabase(app)
      const storage = getStorage(app);
      const authentification = getAuth(app)


        setAnalytics(analytics)
        setDatabase(database)
        setStorages(storage)
        setAuth(authentification)
      
    }
  }, [])


  return { Database, Analytics, Storages, Auth }
}