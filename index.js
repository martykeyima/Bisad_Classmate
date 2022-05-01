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

let userList = document.getElementById("userList");
let form = document.getElementById("addUser");

function renderUser(user) {

    let li = document.createElement("li");
    let name = document.createElement("p");
    let id = document.createElement("p");
    let del = document.createElement("div");

    del.className = 'del'

    li.setAttribute("data-id", user.id);

    name.innerText = user.data().name;
    del.innerText = "X";
    id.innerText = `id: ${user.id}`;

    li.appendChild(name);
    li.appendChild(id);
    li.appendChild(del);

    userList.appendChild(li);

    //del
    del.addEventListener('click', async (e) => {
        let id = e.target.parentElement.getAttribute('data-id');
        console.log(id);
        // await deleteDoc(doc(db, "users", id));
        await deleteDoc(doc(db, "users", id));

    });
    

}

// read
try {

    // const q = query(user, where("name", "==", "com")); // วิธี filter ด้วย where
    // const q = query(user, orderBy('name')); // filter ด้วย orderBy
    // const q = query(user, where("name", "in", ["com", "pear"] ));
    const user = collection(db, "users");
    const q = query(user);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
        renderUser(doc);
    })
} catch (error) {
    throw error
}

// add
try {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        // let com = document.getElementById("name").value;
        await addDoc(collection(db, "users"), {
            name: form.name.value
        })
        form.name.value = ""; //reset to null
      });
} catch (error) {
    throw error
}

// realtime
// const q = query(collection(db, "users"));
// const unsubscribe = onSnapshot(q, (querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//     renderUser(doc)
// });
// });


// querySnapshot.forEach((doc) => {
//     renderUser(doc)
// firebase.firestore.FieldPath.documentId()




// const lis = [];
// lis.push("commy")
// lis.push("pear")

// const washingtonRef = doc(db, "users", "XPl3WEETLSyzXcJ9PmKM");


//     await updateDoc(washingtonRef, {
//         id: lis
//     })