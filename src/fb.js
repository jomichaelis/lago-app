import firebase from 'firebase/app'
import 'firebase/firestore'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAvadFiwtwbgIFZvpOhbFybVTVIrrkQGG0",
  authDomain: "jm-lago-app.firebaseapp.com",
  databaseURL: "https://jm-lago-app.firebaseio.com",
  projectId: "jm-lago-app",
  storageBucket: "jm-lago-app.appspot.com",
  messagingSenderId: "792875159881",
  appId: "1:792875159881:web:d0d50ecf5ecfca6b"
};
firebase.initializeApp(config);
const db = firebase.firestore();

export default db;
