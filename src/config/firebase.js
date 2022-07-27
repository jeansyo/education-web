import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD05aEAzdRfHo_Vki3mmYngcJ25bQK2wkQ",
    authDomain: "lmsbm-28298.firebaseapp.com",
    projectId: "lmsbm-28298",
    storageBucket: "lmsbm-28298.appspot.com",
    messagingSenderId: "6220409619",
    appId: "1:6220409619:web:b02da7dbe877db9ffa88e6"
  }

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseStorage = getStorage(firebaseApp)