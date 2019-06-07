import firebase from 'firebase/app'
import 'firebase/firestore'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCY7WaHrlgCb1bJw2Q-T7QH9v4DhU_Iqmk",
  authDomain: "vue-lago-app.firebaseapp.com",
  databaseURL: "https://vue-lago-app.firebaseio.com",
  projectId: "vue-lago-app",
  storageBucket: "vue-lago-app.appspot.com",
  messagingSenderId: "5686404134",
  appId: "1:5686404134:web:7856d22b9ef08e85"
};
firebase.initializeApp(config);
const db = firebase.firestore();

export default db;
