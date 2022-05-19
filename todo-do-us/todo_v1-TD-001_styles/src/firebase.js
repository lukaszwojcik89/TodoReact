import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDAVqzpDOgFfRfD-dfJo-bmNAJZQX3-1jE",
    authDomain: "todo-d0297.firebaseapp.com",
    projectId: "todo-d0297",
    storageBucket: "todo-d0297.appspot.com",
    messagingSenderId: "1061872637069",
    appId: "1:1061872637069:web:70ac4438c765eaca54fec4"
};

const firebase = initializeApp(firebaseConfig);

export const db = getFirestore(firebase);

export default firebase;