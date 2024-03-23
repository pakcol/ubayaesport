import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBG7e9KNHsOhlxDn7XEpRjA1wCNMtjdbxo",
  authDomain: "ubayaesports.firebaseapp.com",
  databaseURL: "https://ubayaesports-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ubayaesports",
  storageBucket: "ubayaesports.appspot.com",
  messagingSenderId: "705495862135",
  appId: "1:705495862135:web:7a1b36ee9411c17e4caf72",
  measurementId: "G-MM1EFXBDTL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

//register
const registerForm = document.querySelector('#register_form');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const name = registerForm['name'].value;
    const nohp = registerForm['nohp'].value;
    const email = registerForm['email_register'].value;
    const password = registerForm['pwd_register'].value;
    
    //register the user
    auth.createUserWithEmailAndPassword(email, password, name, nohp).then(cred => {
        console.log(cred)
    });
})