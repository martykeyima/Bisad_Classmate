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
  

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const upload = document.getElementById('upload')
const file = document.getElementById('file')
const profile22 = document.getElementById('profile22')
// const comment = document.getElementById('comment')
// const send = document.getElementById('send')
const save = document.getElementById('save')

var idu = sessionStorage.getItem("idu");
console.log('idu', idu);
var ida = sessionStorage.getItem("ida");
console.log('ida', ida);
if (ida != 'admin') {
    document.getElementById('approveid').style.display = 'none'
}

var lis1 = sessionStorage.getItem("lis1");
// console.log('lis3', (lis3))
lis1 = lis1.split(',');
console.log('lis1', lis1)

var profile33 = document.getElementById('profile33')


save.addEventListener('click', async (e) => {
    const name1 = document.getElementById('name1').innerText
    const phone1 = document.getElementById('phone1').innerText
    const address1 = document.getElementById('address1').innerHTML

    const name3 = document.getElementById('name3').value
    const phone3 = document.getElementById('phone3').value
    const address2 = document.getElementById('address2').value

    if (name3 != name1 || phone1 != phone3 || address1 != address2) {
        const washingtonRef = doc(db, "users", idu);
        await updateDoc(washingtonRef, {
            name: name3,
            phone: phone3,
            address: address2
        })
        location.reload();
    }
})

function renderUsers(user) {
    document.getElementById('name1').innerText = user.data().name
    document.getElementById('name3').value = user.data().name

    document.getElementById('phone1').innerText = user.data().phone
    document.getElementById('phone3').value = user.data().phone

    document.getElementById('address1').innerText = user.data().address
    document.getElementById('address2').value = user.data().address

    profile22.src = user.data().src
    profile33.src = user.data().src

}



const qty_auto = document.getElementById('qty_auto');
if (lis1.length - 1 > 0) {
    qty_auto.innerText = `${lis1.length - 1}`
    qty_auto.style.display = 'block'
}

upload.addEventListener('click', async (e) => {
    file.click()
})

file.addEventListener('input', async (e) => {
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
        // console.log(reader.result)
        // const lll = reader.result;
        const src = reader.result
        profile22.src = src
        profile33.src = src

        const washingtonRef = doc(db, "users", idu);
        updateDoc(washingtonRef, {
            src: src
        })
        // slip.style.display = 'block'

    }
    if (file) {
        reader.readAsDataURL(file);
    } else {
        console.log('pear')
    }
})


// read
try {
    const users = collection(db, "users");
    const q = query(users, where('idu', '==', idu));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
        renderUsers(doc);
    })
} catch (error) {
    throw error
}

const out = document.getElementById('out')
out.addEventListener('click', async (e) => {
    sessionStorage.removeItem("idu");
    sessionStorage.removeItem("ida");
    sessionStorage.removeItem("lis1");
    sessionStorage.removeItem("lis2");
    sessionStorage.removeItem("ida");
    window.location.href = "index.html";
})