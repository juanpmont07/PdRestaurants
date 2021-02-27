import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyCWUm3j0Oe27OGVoIuY2aEc6QVbwRMOJIU",
  authDomain: "restaurants-9e894.firebaseapp.com",
  projectId: "restaurants-9e894",
  storageBucket: "restaurants-9e894.appspot.com",
  messagingSenderId: "109170401565",
  appId: "1:109170401565:web:a1d99c246dc70ec85cc1f4"
};


  export const firebaseApp = firebase.initializeApp(firebaseConfig)