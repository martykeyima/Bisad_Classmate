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
var idu = sessionStorage.getItem("idu");
console.log('idu', idu);

const parent = document.getElementById('container');

var ida = sessionStorage.getItem("ida");
console.log('ida', ida);
if (ida != 'admin') {
    document.getElementById('approveid').style.display = 'none'
}

var lis3 = sessionStorage.getItem("lis1");
console.log('lis3', (lis3))
const lis1 = lis3.split(',');
console.log('lis1', lis1)

//aty_auto
const qty_auto = document.getElementById('qty_auto');
if (lis1.length - 1 > 0) {
    qty_auto.innerText = `${lis1.length - 1}`
    qty_auto.style.display = 'block'
}

//tranform number to number with comma
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}


function renderHistory(his) {
    const row1 = document.createElement('div');
    row1.setAttribute('class', 'row card');

    const date = document.createElement('div')
    const datetext = document.createElement('p');
    const hr = document.createElement('hr');
    const dateObject = new Date(his.data().milliseconds)
    const day = dateObject.toLocaleString("th-TH", { day: "numeric" })
    const month = dateObject.toLocaleString("th-TH", { month: "long" })
    const year = dateObject.toLocaleString("th-TH", { year: "numeric" })
    datetext.innerText = `ชำระเงินวันที่ ${day} ${month} ${year}   `
    date.appendChild(datetext);
    date.appendChild(hr)
    row1.appendChild(date)
    console.log(typeof (dateObject.toLocaleString()))

    const productid = his.data().productlis;
    const productsrc = his.data().productsrc;
    const productname = his.data().productname;
    const productprice = his.data().productprice;
    const lis = [];

    for (let i = 0; i < productsrc.length; i++) {
        if (lis.includes(productsrc[i])) {
            console.log("pass")
        }
        else {
            lis.push(productsrc[i])

            const row = document.createElement('div');
            const col1 = document.createElement('div');
            const col2 = document.createElement('div');
            const col3 = document.createElement('div');
            const col4 = document.createElement('div');
            const col5 = document.createElement('div');

            row.className = 'row'
            col1.className = 'col'
            col2.className = 'col'
            col3.className = 'col'
            col4.className = 'col'
            col5.className = 'col'

            const img = document.createElement('img');
            img.className = 'detail'
            img.setAttribute('src', productsrc[i]);
            img.setAttribute('style', 'width:200px;');
            img.setAttribute('title', productname[i]);

            const name = document.createElement('p');
            name.className = 'detail'
            name.setAttribute('style', 'margin-top: 40px;')
            name.setAttribute('title', productname[i])
            name.innerText = productname[i];

            const price = document.createElement('p')
            price.setAttribute('style', 'margin-top: 40px;')
            price.innerText = `เครื่องละ ฿${numberWithCommas(productprice[i])}`;

            const qty = document.createElement('p');
            qty.setAttribute('style', 'margin-top: 40px;')

            //count value
            const counts = {};
            for (const num of productsrc) {
                counts[num] = counts[num] ? counts[num] + 1 : 1;
            }
            //count value
            qty.innerText = `QTY: ${counts[productsrc[i]]}`

            const status = document.createElement('p');
            status.innerText = ''

            col1.appendChild(img)
            col1.setAttribute('data-id', productid[i + 1]);
            col2.appendChild(name)
            col2.setAttribute('data-id', productid[i + 1])
            col3.appendChild(price)
            col4.appendChild(qty)
            col5.appendChild(status)

            row.appendChild(col1);
            row.appendChild(col2);
            row.appendChild(col3);
            row.appendChild(col4);
            row.appendChild(col5);

            row1.appendChild(row);

            img.addEventListener('click', async (e) => {
                let id = e.target.parentElement.getAttribute('data-id');
                sessionStorage.setItem("idp", id);
                window.location.href = "detail.html";
            })

            name.addEventListener('click', async (e) => {
                let id = e.target.parentElement.getAttribute('data-id');
                sessionStorage.setItem("idp", id);
                window.location.href = "detail.html";
            })
        }

    }
    if (his.data().status == 'wait') {
        const status1 = document.createElement('p');
        status1.className = 'wait2'
        status1.innerText = 'กำลังตรวจสอบสลิปโอนเงิน'
        status1.setAttribute('style', 'font-weight:bold')
        row1.appendChild(status1)
    } else if (his.data().status == 'ผ่าน') {
        const div1 = document.createElement('div');
        const status1 = document.createElement('p');
        const status2 = document.createElement('p');
        status1.innerText = `ขนส่งโดย: ${his.data().logis}`
        status2.innerText = `รหัสขนส่ง: ${his.data().logisv}`
        status2.setAttribute('style', 'width: 250px;font-weight:bold')
        status1.setAttribute('style', 'font-weight:bold')
        div1.appendChild(status1)
        div1.appendChild(status2)
        div1.className = 'statusdiv'
        row1.appendChild(div1)
    } else {
        const div1 = document.createElement('div');
        const status1 = document.createElement('p');
        const status2 = document.createElement('p');
        status1.innerText = `ไม่ผ่านการอนุมัติ`
        status1.setAttribute('style', 'color:red;font-weight:bold;')
        status2.setAttribute('style', 'color:red;')
        status2.innerText = `${his.data().approvev}`
        div1.appendChild(status1)
        div1.appendChild(status2)
        div1.className = 'statusdiv'
        row1.appendChild(div1);
    }

    parent.appendChild(row1)
    return 1

}
let commy = 0
// read
try {
    const history = collection(db, "history");
    const q = query(history, where('idu', '==', idu), orderBy('milliseconds', 'desc'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
        commy = renderHistory(doc);
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


const users = collection(db, "users");
const q = query(users, where('idu', '==', idu));
const querySnapshot = await getDocs(q);
querySnapshot.forEach(doc => {
    document.getElementById('profile33').src = doc.data().src
})

if (commy == 0) {
    console.log('commy')
}