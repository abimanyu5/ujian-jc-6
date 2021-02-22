import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD-lsbg6bhjgAUeRP2_nQTgRehdm3GD4hE",
    authDomain: "reactna-5faa9.firebaseapp.com",
    databaseURL: "https://reactna-5faa9-default-rtdb.firebaseio.com",
    projectId: "reactna-5faa9",
    storageBucket: "reactna-5faa9.appspot.com",
    messagingSenderId: "594466283106",
    appId: "1:594466283106:web:a17f1aa40fdaa2cc5efb3b",
    measurementId: "G-L5VH7F8CQZ"
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

export {db};