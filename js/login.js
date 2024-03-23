import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import { getDatabase, child, ref, update, get } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";

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
const dbref = ref(database);


let loginButton = document.getElementById('button_login');
// let emailLogin = document.getElementById('email_login').value;
// let passwordLogin = document.getElementById('pwd_login').value;

// let LogInUser = evt => {
//   evt.preventDefault();

//   signInWithEmailAndPassword(auth, emailLogin, passwordLogin)
//   .then((credentials) =>{
//     console.log(credentials);
//     get(child(dbref, 'users/'+credentials.user.uid)).then((snapshot) => {
//       if(snapshot.exists){
//         sessionStorage.setItem("user-info", JSON.stringify({
//           nama: snapshot.val().name,
//           nohp: snapshot.val().nohp
//         }))
//         sessionStorage.setItem("user-creds", JSON.stringify(credentials.user));
//         window.location.href='../index.html';
//       }
//     })
//   })
//   .catch((error) => {
//     alert(error.message);
//     console.log(error.code);
//     console.log(error.message);
//   })
// }
// loginButton.addEventListener('click', LogInUser);


loginButton.addEventListener('click', (e) => {
    let emailLogin = document.getElementById('email_login').value;
    let passwordLogin = document.getElementById('pwd_login').value;
    signInWithEmailAndPassword(auth, emailLogin, passwordLogin)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      let lgDate = new Date();
      
      get(ref(database, 'users/' + user.uid)).then((snapshot) => {
        console.log(snapshot)
        if(snapshot.exists){
            sessionStorage.setItem("user-info", JSON.stringify({
              nama: snapshot.val().name,
              nohp: snapshot.val().nohp
            }))
            sessionStorage.setItem("user-creds", JSON.stringify(credentials.user));
            window.location.href='../index.html';
            }
          })
        .catch((error) => {
          console.error(error);
      });

      update(ref(database, 'users/' + user.uid), {
        last_login: lgDate
        })
        .then(() => {
          // Data saved successfully!
          alert("Login Sukses!");
          location.href = "../index.html";
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
    
  signOut(auth)
    .then(() => {})
    .catch((error) => {});
});

