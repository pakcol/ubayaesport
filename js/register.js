import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
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
let signupButton = document.getElementById('button_register');

signupButton.addEventListener('click', (e) => {
  let name = document.getElementById('name').value;
  let nohp = document.getElementById('nohp').value;
  let emailSignup = document.getElementById('email_register').value;
  let passwordSignup = document.getElementById('pwd_register').value;

  createUserWithEmailAndPassword(auth, emailSignup, passwordSignup)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      set(ref(database, "users/" + user.uid), {
        name: name,
        nohp: nohp,
        email: emailSignup,
        password: passwordSignup
      })
        .then(() => {
          // Data saved successfully!
          alert("User berhasil ditambahkan!");
          location.href = "../loginPage.html";
          alert("Silahkan Login akun Anda!");
        })
        .catch((error) => {
          //the write failed
          alert(error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});


