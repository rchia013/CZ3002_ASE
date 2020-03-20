// This is for linking to firebase
// Possible to put in an .env file, but I don't wanna do it coz it looks complicated
import Rebase from "re-base";
// import firebase from 'firebase'

var firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyAJC89W4Ri_RMi47vXwaB--Krtjz83_FRY",
  authDomain: "neadatabase.firebaseapp.com",
  databaseURL: "https://neadatabase.firebaseio.com",
  projectId: "neadatabase",
  storageBucket: "neadatabase.appspot.com",
  messagingSenderId: "545938314026",
  appId: "1:545938314026:web:4f2a985d905f3eb3224453",
  measurementId: "G-9H01WLR7DF"
};

const firebaseapp = firebase.initializeApp(firebaseConfig);
const base = Rebase.createClass(firebaseapp.database());
const functions = firebase.functions();

export { firebaseapp };
export { base };
export { functions };
