import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getFirestore, collection, query, getDocs, doc, setDoc, addDoc, deleteDoc, where, orderBy, onSnapshot, updateDoc, arrayUnion } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';

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
var ida = sessionStorage.getItem("ida");
console.log('ida', ida);

if (ida != 'admin') {
    document.getElementById('approveid').style.display = 'none'
} else {
    document.getElementById('history').style.display = 'none'
    document.getElementById('basketicon').style.display = 'none'
    document.querySelector(".menu").style.display = 'none'
}

const pdiv = document.getElementById("row");
const addp = document.getElementById('addp');


//tranform number to number with comma
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}


//อ่านสินค้าที่ user ใส่ตระกร้า
const users = collection(db, "users");
const q = query(users, where('idu', '==', idu));
const querySnapshot = await getDocs(q);
querySnapshot.forEach(doc => {
    document.getElementById('profile33').src = doc.data().src
    const lis2 = doc.data().productlis
    console.log('lis2', lis2)
    sessionStorage.setItem("lis2", lis2);
    // เมื่อชำระเงินแล้วอย่าลืมมารีเซ็ต

})

var lis1 = sessionStorage.getItem("lis2");
// console.log('lis3', (lis3))
lis1 = lis1.split(',');
console.log('lis1 first', lis1)
sessionStorage.setItem("lis1", lis1);

const qty_auto = document.getElementById('qty_auto');
if (lis1.length - 1 > 0) {
    qty_auto.innerText = `${lis1.length - 1}`
    qty_auto.style.display = 'block'
}

function renderProduct(product) {
    let div = document.createElement('div');
    let img = document.createElement('img');
    let dib = document.createElement('div');
    let h5 = document.createElement('h5');
    let del = document.createElement('div');
    let span = document.createElement('span');
    let i = document.createElement("i");
    let buy = document.createElement('button');
    let basket = document.createElement('button');
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    let col = document.createElement('div');


    div.setAttribute("data-id", product.id);
    col.setAttribute("id", product.id);
    dib.setAttribute("databody-id", product.id);
    h5.setAttribute('style', 'cursor: pointer;')
    h5.setAttribute('title', product.data().name)

    div.className = "card";
    img.className = "card-img-top";
    dib.className = "card-body";
    // dib.setAttribute('class','card-body bg-danger')
    h5.className = "card-title";
    del.className = "del";
    span.className = "price_span";
    i.className = "fas fa-pencil-alt";
    buy.className = "btn buy";
    basket.className = "btn basket";
    col.className = 'col-4'

    h5.innerText = product.data().name;
    del.innerText = "X";
    // const x = numberWithCommas(product.data().price);
    span.innerText = `฿${numberWithCommas(product.data().price)}`;
    buy.innerText = "buy";
    basket.innerText = "cart";

    // div.setAttribute("style", "width: 100% height: 29rem;");
    img.setAttribute("src", product.data().src);
    img.setAttribute("style", "width: 100%;cursor: pointer;");
    img.setAttribute("title", product.data().name);
    // title="click here"



    dib.appendChild(h5);
    // dib.appendChild(span);
    dib.appendChild(buy);
    dib.appendChild(basket);
    dib.appendChild(p1);
    dib.appendChild(p2);

    div.appendChild(img);
    div.appendChild(dib);
    div.appendChild(del);
    div.appendChild(span);
    div.appendChild(i);
    div.appendChild(p1);
    // div.appendChild(p2);

    col.appendChild(div);
    col.appendChild(p1)

    pdiv.appendChild(col);
    // pdiv.appendChild(document.createElement('br'));
    // pdiv.appendChild(p2);


    //del
    del.addEventListener('click', async (e) => {
        let id = e.target.parentElement.getAttribute('data-id');
        console.log(id);
        await deleteDoc(doc(db, "products", id));
        location.reload();

    });

    //update
    i.addEventListener('click', async (e) => {
        let id = e.target.parentElement.getAttribute('data-id');
        sessionStorage.setItem("favoriteMovie", id);

        window.location.href = "updateP.html";

    });

    //basket
    basket.addEventListener('click', async (e) => {
        e.preventDefault();
        let id = e.target.parentElement.getAttribute('databody-id');
        lis1.push(id);
        console.log('lis1', lis1);
        // qty_auto.innerText = `${lis1.length - 1}`
        $(qty_auto).hide(0, function () {
            $(this).html(`${lis1.length - 1}`).show(200);
        });
        // qty_auto.style.display = 'block'
        sessionStorage.setItem("lis1", lis1);

        const washingtonRef = doc(db, "users", idu);
        await updateDoc(washingtonRef, {
            productlis: lis1
        })
    })

    //buy
    buy.addEventListener('click', async (e) => {
        e.preventDefault();
        let id = e.target.parentElement.getAttribute('databody-id');
        lis1.push(id);
        console.log('lis1', lis1)
        const washingtonRef = doc(db, "users", idu);
        await updateDoc(washingtonRef, {
            productlis: lis1
        })

        sessionStorage.setItem("lis1", lis1);
        window.location.href = "basket.html";
    })

    //card to detail
    img.addEventListener('click', async (e) => {
        const id = e.target.parentElement.getAttribute('data-id')
        console.log('id', id)

        const washingtonRef = doc(db, "users", idu);
        await updateDoc(washingtonRef, {
            productlis: lis1
        })
        sessionStorage.setItem("lis1", lis1);
        sessionStorage.setItem("idp", id);
        window.location.href = "detail.html";
    })

    //title to detail
    h5.addEventListener('click', async (e) => {
        const id = e.target.parentElement.getAttribute('databody-id')
        console.log('id', id)

        const washingtonRef = doc(db, "users", idu);
        await updateDoc(washingtonRef, {
            productlis: lis1
        })
        sessionStorage.setItem("lis1", lis1);
        sessionStorage.setItem("idp", id);
        window.location.href = "detail.html";
    })

    //if admin
    if (ida == 'admin') {
        console.log('welcome admin')
        buy.style.display = 'none'
        basket.style.display = 'none'
        document.querySelector('footer').style.display = 'none'
    } else {
        del.setAttribute('style', 'display:none;');
        i.setAttribute('style', 'display:none;');
        addp.setAttribute('style', 'display:none;');
    }

}
console.log('lis1', lis1);

// read
try {
    const products = collection(db, "products");
    const q = query(products, orderBy('name'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
        renderProduct(doc);
    })
} catch (error) {
    throw error
}

//goto aff product
addp.addEventListener('click', async (e) => {
    window.location.href = "addP.html";
})


//search bar
const search = document.getElementById('search');
const col = document.getElementsByClassName('col-4');
const price = document.getElementsByClassName('price_span');
const title = document.getElementsByClassName('card-title');
console.log('price', price[0].innerText)
// console.log('title', title[0]); 

search.addEventListener('input', async (e) => {
    console.log(e.target.value.toLowerCase())
    const txt = e.target.value.toLowerCase();
    for (let i = 0; i < title.length; i++) {
        if (title[i].innerText.toLowerCase().includes(txt)) {
            $(document).ready(function () {
                $(col[i]).show(300);
            });
            // col[i].style.display = 'block';
        } else {
            $(document).ready(function () {
                $(col[i]).hide(300);
            });
            // col[i].style.display = "none";
        }
    }
})

// scale
const
    range = document.getElementById('range'),
    rangeV = document.getElementById('rangeV'),
    setValue = () => {
        const
            newValue = Number((range.value - range.min) * 100 / (range.max - range.min)),
            newPosition = 10 - (newValue * 0.2);
        rangeV.innerHTML = `<span>${numberWithCommas(range.value)}</span>`;
        rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
    };
document.addEventListener("DOMContentLoaded", setValue);
range.addEventListener('input', setValue);
range.addEventListener('input', async (e) => {
    const filprice = parseInt(e.target.value);
    for (let i = 0; i < title.length; i++) {
        const num = price[i].innerText.replace('฿', '')
        const com = num.replace(',', '')
        if (parseInt(com) <= filprice) {
            $(document).ready(function () {
                $(col[i]).show(300);
            });
            // col[i].style.display = 'block';
        } else {
            $(document).ready(function () {
                $(col[i]).hide(300);
            });
            // col[i].style.display = 'none';
        }
    }

});

const basketicon = document.getElementById('basketicon');
basketicon.addEventListener('click', async (e) => {
    sessionStorage.setItem("lis1", lis1);
    window.location.href = "basket.html";
})

const history = document.getElementById('history')
history.addEventListener('click', async (e) => {
    sessionStorage.setItem("lis1", lis1);
    window.location.href = "history.html";
})

const out = document.getElementById('out')
out.addEventListener('click', async (e) => {
    sessionStorage.removeItem("idu");
    sessionStorage.removeItem("ida");
    sessionStorage.removeItem("lis2");
    window.location.href = "index.html";
})


