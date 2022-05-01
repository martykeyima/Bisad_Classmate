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
// var idu = sessionStorage.getItem("idu");
// console.log('idu', idu);


let form = document.getElementById("addP")

// render Product
function renderProduct(product) {
    const idp = product.id
    const washingtonRef = doc(db, "products", idp);
    updateDoc(washingtonRef, {
        idp: idp
    })
}

// add
try {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        // let com = document.getElementById("name").value;
        const namep = form.name.value;
        if (form.src.value == '') {
            var productsrt = sessionStorage.getItem("srcproduct"); 
            sessionStorage.removeItem("srcproduct");
        } else {
            var productsrt = form.src.value
        }

        await addDoc(collection(db, "products"), {
            src: productsrt,
            name: form.name.value,
            price: form.price.value,
            detail: form.detail.value
        })
        form.src.value = ""; //reset to null
        form.name.value = ""; //reset to null
        form.price.value = ""; //reset to null
        form.detail.value = ""; //reset to null

        const users = collection(db, "products");
        const q = query(users, where("name", '==', namep));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            const n = renderProduct(doc);
        })
        window.location.href = 'product.html'
    });
} catch (error) {
    throw error
}

const show = document.getElementById('show');

const src = document.getElementById('src');
src.addEventListener('input', (e) => {
    show.src = e.target.value
})

// read
// call read