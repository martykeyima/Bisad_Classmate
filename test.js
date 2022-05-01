import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getFirestore, collection, query, getDocs, doc, setDoc, addDoc, deleteDoc, where, orderBy, onSnapshot, updateDoc } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyCScLWvi_oEc0LXcPP2tpLRCgcd2W4TI6Q",
  authDomain: "commy-testing.firebaseapp.com",
  projectId: "commy-testing",
  storageBucket: "commy-testing.appspot.com",
  messagingSenderId: "713532664743",
  appId: "1:713532664743:web:9f7257c869c2b506a0a482"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// document.getElementById('file').click();

const commy = document.getElementById('commy')
const file = document.getElementById('file');
const img = document.getElementById('img');
const country = document.getElementById('country');
const pear = document.getElementById('pear');

pear.addEventListener('click', async (e) => {
  country.removeAttribute('readonly')
  country.setAttribute("autofocus", "autofocus")
})

commy.addEventListener('click', async (e) => {
  file.click();
})

file.addEventListener('input', async (e) => {
  var file = document.querySelector('input[type=file]').files[0];
  var reader = new FileReader();

  reader.onloadend = function () {
    // console.log(reader.result)
    // const lll = reader.result;
    img.src = reader.result
  }
  if (file) {
    reader.readAsDataURL(file);
  } else {
    console.log('pear')
  }
})