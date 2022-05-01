import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getFirestore, collection, query, getDocs, doc, setDoc, addDoc, deleteDoc, where, orderBy, onSnapshot, updateDoc } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyC7rNPrhyMddwL_91i6xx3ZukwanE-Do3c",
    authDomain: "bisad-classmate.firebaseapp.com",
    projectId: "bisad-classmate",
    storageBucket: "bisad-classmate.appspot.com",
    messagingSenderId: "464125592268",
    appId: "1:464125592268:web:e576f523bb4525a3623869"
  };
  

var idp = sessionStorage.getItem("favoriteMovie");
var idu = sessionStorage.getItem("idu");
console.log('idp', idp)
console.log('idu', idu)

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById('signin');
const userlis = []


//usermore
function renderUsermore(users) {
    userlis.push(users.data().username)
}

//read
function renderUser(users, username, password) {
    // console.log(users.data().password)
    // console.log(password)

    if ((password == users.data().password)) {

        //pass value to storage
        sessionStorage.setItem("idu", users.id);
        sessionStorage.setItem("ida", users.data().ida);
        window.location.href = "product.html";
    } else {
        alert('ใส่รหัสผิด')
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const username = form.username.value;
    const password = form.password.value;

    // call read
    try {
        const users = collection(db, "users");
        const q = query(users, where("username", '==', username));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            renderUser(doc, username, password);
        })
    } catch (error) {
        throw error
    }
    form.username.value = '';
    form.password.value = '';

    if (userlis.includes(username)) {
        console.log('มีนะคอม')
    } else {
        alert('ไม่มีชื่อผู้ใช้นี้ในระบบ')
    }

});

try {
    const users = collection(db, "users");
    const q = query(users);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
        renderUsermore(doc);
    })
} catch (error) {
    throw error
}
