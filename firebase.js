// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'x-clone-422716.firebaseapp.com',
  projectId: 'x-clone-422716',
  storageBucket: 'x-clone-422716.appspot.com',
  messagingSenderId: '431136426513',
  appId: '1:431136426513:web:3a6f4fca8e53c7c4debfb0',
  measurementId: 'G-BD289E4F13',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
//const analytics = getAnalytics(app)
