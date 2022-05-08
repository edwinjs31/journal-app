import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'; // This line is important

export const googleProvider = new firebase.auth.GoogleAuthProvider();

const firebaseConfig = {
    apiKey: "AIzaSyDZpl5sfYX_q74uU5DYpgDxZVDM1X00i4g",
    authDomain: "react-curso-48bca.firebaseapp.com",
    projectId: "react-curso-48bca",
    storageBucket: "react-curso-48bca.appspot.com",
    messagingSenderId: "65780609037",
    appId: "1:65780609037:web:6ce18b607b5adaa24fa544"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//const app = initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAutProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAutProvider,
    firebase
}
