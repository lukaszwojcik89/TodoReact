import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBvZ9d3cc5RlQMpnzxBA85tBvZqCjzKb_k",
    authDomain: "todo-2deb5.firebaseapp.com",
    projectId: "todo-2deb5",
    storageBucket: "todo-2deb5.appspot.com",
    messagingSenderId: "375230290067",
    appId: "1:375230290067:web:c13934f4d9f995bd631566"
};

const firebase = initializeApp(firebaseConfig);

export const db = getFirestore(firebase);

export default firebase;