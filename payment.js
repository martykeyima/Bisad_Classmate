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

// var raka = sessionStorage.getItem("raka");
// console.log('raka', raka);

var ida = sessionStorage.getItem("ida");
console.log('ida', ida);
if (ida != 'admin') {
    document.getElementById('approveid').style.display = "none"
}

var lis1 = sessionStorage.getItem("lis1");
lis1 = lis1.split(',');
console.log('lis1', lis1);

const productsrc = [];
const productname = [];
const productprice = [];

const qty_auto = document.getElementById('qty_auto');
if (lis1.length - 1 > 0) {
    qty_auto.innerText = `${lis1.length - 1}`
    qty_auto.style.display = 'block'
}

function renderProducts(product) {
    productsrc.push(product.data().src)
    console.log('productsrc', productsrc)

    productname.push(product.data().name)
    console.log('productname', productname)

    productprice.push(product.data().price);
    console.log('productprice', productprice)
}


for (let i = 0; i < lis1.length; i++) {
    // read
    try {
        const products = collection(db, "products");
        const q = query(products, where('idp', '==', lis1[i]));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            renderProducts(doc);
        })
    } catch (error) {
        throw error
    }
}
//tranform number to number with comma
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

const name = document.getElementById('name')
const phone = document.getElementById('phone')
const address = document.getElementById('address')
const edit = document.getElementById('edit')
const save = document.getElementById('save')
const choose = document.getElementById('choose')
const remove = document.getElementById('remove')
const file = document.getElementById('file')
const slip = document.getElementById('slip')
const order = document.getElementById('order')
const total1 = document.getElementById('total1')
const total2 = document.getElementById('total2')
const pay = document.getElementById('pay')

order.innerText = `ยอดรวม(${productname.length}รายการ)`
const raka = productprice.reduce((a, b) => parseInt(a) + parseInt(b), 0)
const total3 = numberWithCommas(productprice.reduce((a, b) => parseInt(a) + parseInt(b), 0))
total1.innerText = `฿${total3}`
total2.innerText = `฿${total3}`

pay.addEventListener('click', async (e) => {

    console.log(slip.src.length)
    if (slip.src.length < 300) {
        alert('กรุณาใส่สลิป')
    } else {
        await addDoc(collection(db, "history"), {
            address: address.value,
            idu: idu,
            milliseconds: Date.now(),
            name: name.value,
            phone: phone.value,
            productlis: lis1,
            productname: productname,
            productprice: productprice,
            productsrc: productsrc,
            src: slip.src,
            status: 'wait',
            total: raka
        })
        const washingtonRef = doc(db, "users", idu);
        await updateDoc(washingtonRef, {
            productlis: null
        })
        lis1 = ''
        sessionStorage.setItem("lis1", lis1);
        window.location.href = "history.html";
    }
})


file.addEventListener('input', async (e) => {
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
        // console.log(reader.result)
        // const lll = reader.result;
        const src = reader.result
        console.log(src)
        slip.src = src
        $(document).ready(function(){
            $(slip).show(300);
            $('#choose').hide();
            $(remove).show();
          });
        // choose.style.display = 'none'
        // remove.style.display = 'block'
        // slip.style.display = 'block'

    }
    if (file) {
        reader.readAsDataURL(file);
    } else {
        console.log('pear')
    }


    // if (e.target.files.length > 0) {
    //     var src = URL.createObjectURL(e.target.files[0]);
    //     // preview.src = src;
    //     slip.style.display = "block";
    // } else if (e.target.files.length == 0) {
    //     slip.style.display = "none";
    // }
})

//slip
choose.addEventListener('click', async (e) => {
    file.click()
})
remove.addEventListener('click', async (e) => {
    // choose.style.display = 'block'
    // remove.style.display = 'none'
    $(document).ready(function(){
        $(slip).hide(500);
        $(choose).show();
        $(remove).hide();
    });
    slip.src = ''
})

//edit
edit.addEventListener('click', async (e) => {
    name.removeAttribute('readonly')
    phone.removeAttribute('readonly')
    address.removeAttribute('readonly')
    name.style.border = '1px solid #333'
    phone.style.border = '1px solid #333'
    address.style.border = '1px solid #333'
    name.style.cursor = 'pointer'
    phone.style.cursor = 'pointer'
    address.style.cursor = 'pointer'
    save.style.display = 'block'
    edit.style.display = 'none'

})

//save
save.addEventListener('click', async (e) => {
    save.style.display = 'none'
    name.setAttribute('readonly', '')
    phone.setAttribute('readonly', '')
    address.setAttribute('readonly', '')
    name.style.border = '1px solid white'
    phone.style.border = '1px solid white'
    address.style.border = '1px solid white'
    name.style.cursor = 'default'
    phone.style.cursor = 'default'
    address.style.cursor = 'default'
    console.log(name.value)
    save.style.display = 'none'
    edit.style.display = 'block'

})

//render user
function renderUser(user) {
    name.value = user.data().name
    phone.value = `${user.data().phone}`
    address.value = user.data().address
    document.getElementById('profile33').src= user.data().src
}


// read
try {
    const users = collection(db, "users");
    const q = query(users, where('idu', '==', idu));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
        renderUser(doc);
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