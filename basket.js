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

var ida = sessionStorage.getItem("ida");
console.log('ida', ida);
if (ida != "admin") {
    document.getElementById('approveid').style.display = 'none'
    console.log('check ida')
}

var lis1 = sessionStorage.getItem("lis1");
lis1 = lis1.split(',');
console.log('lis1', lis1);

const row = document.getElementById('row');
const lisprice = [];
const lisproduct = [];

const ppayment = document.getElementById('p-payment')

//qty_auto
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

//read product
function renderProduct(product, count) {

    lisprice.push(parseInt(product.data().price))

    if (lisproduct.includes(lis1[count])) {
        console.log('commy')
    } else {
        console.log('pear')
        lisproduct.push(lis1[count])

        console.log(count)
        let card = document.createElement('div');
        let src = document.createElement('img');
        let cardbody = document.createElement('div');
        let h5 = document.createElement('h5');
        let price = document.createElement('h5');
        let row1 = document.createElement('div');
        let col1 = document.createElement('div');
        let col2 = document.createElement('div');
        let i = document.createElement('i');

        let p1 = document.createElement('p');
        let p2 = document.createElement('p');

        card.setAttribute('data-id', product.id);
        cardbody.setAttribute('databody-id', product.id);
        col1.setAttribute('data-id', product.id);
        card.setAttribute('style', 'width: 100rem;');
        src.setAttribute('src', product.data().src);
        src.setAttribute('style', 'cursor:pointer;');
        src.setAttribute('title', product.data().name);
        h5.setAttribute('style', 'cursor:pointer;');
        h5.setAttribute('title', product.data().name);

        row1.className = 'row';
        col1.className = 'col-4';
        col2.className = 'col-8';


        card.className = "card";
        src.className = "card-img-top";
        cardbody.className = "card-body";
        h5.className = "card-title";
        price.className = "card-price";
        i.className = "fas fa-trash-alt";

        h5.innerText = product.data().name;
        price.innerText = `฿${numberWithCommas(parseInt(product.data().price) * lis1.filter(x => x == product.id).length)}`

        // สร้างปุ่มเพิ่มลด
        const div1 = document.createElement('div');
        div1.setAttribute('class', 'parentplusminus d-flex justify-content-end')

        const div2 = document.createElement('div');
        div2.setAttribute('class', 'd-flex align-items-center')
        div2.setAttribute('data-id', `${product.id}`)

        const span1 = document.createElement('span')
        span1.setAttribute('class', 'update minus paragraph')
        span1.setAttribute('data-id', `${product.id}`)
        span1.setAttribute('id', 'minus')
        const i1 = document.createElement('i')
        i1.setAttribute('class', 'fas fa-minus')
        span1.appendChild(i1)

        const input = document.createElement('input')
        input.setAttribute('class', `qty ${product.id}`)
        input.setAttribute('id', product.id)
        input.setAttribute('type', 'number')
        input.setAttribute('value', `${lis1.filter(x => x == product.id).length}`)
        input.setAttribute('min', '0')

        const span2 = document.createElement('span')
        span2.setAttribute('data-id', `${product.id}`)
        span2.setAttribute('class', 'update plus paragraph')
        span2.setAttribute('id', 'plus')
        const i2 = document.createElement('i')
        i2.setAttribute('class', 'fas fa-plus')
        span2.appendChild(i2)

        div2.appendChild(span1)
        div2.appendChild(input)
        div2.appendChild(span2)

        div1.appendChild(div2)
        // สร้างปุ่มเพิ่มลด

        cardbody.appendChild(h5);
        cardbody.appendChild(div1)
        cardbody.appendChild(price);
        cardbody.appendChild(i);


        col1.appendChild(src)
        col2.appendChild(cardbody)

        row1.appendChild(col1)
        row1.appendChild(col2)

        // card.appendChild(src)
        // card.appendChild(cardbody)
        card.appendChild(row1)

        row.appendChild(card)
        row.appendChild(p1)
        row.appendChild(p2)

        //del
        i.addEventListener('click', async (e) => {
            let id = e.target.parentElement.getAttribute('databody-id');
            console.log('id', id);
            // await deleteDoc(doc(db, "products", id));
            const delnum = lis1.filter(x => x == id).length
            const index = lis1.indexOf(id);
            if (index > -1) {
                lis1.splice(index, delnum); // 2nd parameter means remove one item only
            }
            console.log(lis1)
            sessionStorage.setItem("lis1", lis1);

            const washingtonRef = doc(db, "users", idu);
            await updateDoc(washingtonRef, {
                productlis: lis1
            })
            location.reload();



        });

        // minus
        span1.addEventListener('click', async (e) => {
            const qty = document.getElementById(e.target.parentElement.getAttribute('data-id'))
            console.log(qty)
            if (parseInt(qty.value) - 1 < 1) {
                qty.value = 1
            } else {
                qty.value = parseInt(qty.value) - 1
                price.innerText = `฿${numberWithCommas(parseInt(product.data().price) * qty.value)}`
                const index = lis1.indexOf(e.target.parentElement.getAttribute('data-id'));
                console.log(index)
                if (index > -1) {
                    lis1.splice(index, 1); // 2nd parameter means remove one item only
                }
                console.log(lis1)
                sessionStorage.setItem("lis1", lis1);

                const washingtonRef = doc(db, "users", idu);
                await updateDoc(washingtonRef, {
                    productlis: lis1
                })
                const indexp = lisprice.indexOf(parseInt(product.data().price))
                if (index > -1) {
                    lisprice.splice(indexp, 1); // 2nd parameter means remove one item only
                }
                const raka = lisprice.reduce((a, b) => a + b, 0)
                console.log('ราคา', raka)
                ppayment.innerText = `ยอดรวม ${numberWithCommas(raka)} บาท`
                sessionStorage.setItem("raka", raka);
                // qty_auto.innerText = `${lis1.length - 1}`
                $(qty_auto).hide(0, function () {
                    $(this).html(`${lis1.length - 1}`).show(200);
                });
            }

            if (qty.value == 1) {
                span1.setAttribute('style', 'cursor: not-allowed;')
            }
        });

        //plus
        span2.addEventListener('click', async (e) => {
            const qty = document.getElementById(e.target.parentElement.getAttribute('data-id'))
            console.log(qty)

            qty.value = parseInt(qty.value) + 1
            span1.setAttribute('style', 'cursor: pointer;')
            price.innerText = `฿${numberWithCommas(parseInt(product.data().price) * qty.value)}`

            lis1.push(e.target.parentElement.getAttribute('data-id'))
            sessionStorage.setItem("lis1", lis1);
            const washingtonRef = doc(db, "users", idu);
            await updateDoc(washingtonRef, {
                productlis: lis1
            })
            // qty_auto.innerText = `${lis1.length - 1}`
            $(qty_auto).hide(0, function () {
                $(this).html(`${lis1.length - 1}`).show(200);
            });

            lisprice.push(parseInt(product.data().price))
            const raka = lisprice.reduce((a, b) => a + b, 0)
            console.log('ราคา', raka)
            ppayment.innerText = `ยอดรวม ${numberWithCommas(raka)} บาท`
            sessionStorage.setItem("raka", raka);

        });

        //img
        src.addEventListener('click', async (e) => {
            // console.log('commy')
            // console.log(e.target.parentElement.getAttribute('data-id'))
            sessionStorage.setItem("idp", e.target.parentElement.getAttribute('data-id'));
            location.href = "detail.html";
        })
        h5.addEventListener('click', async (e) => {
            // console.log('commy')
            // console.log(e.target.parentElement.getAttribute('databody-id'))
            sessionStorage.setItem("idp", e.target.parentElement.getAttribute('databody-id'));
            location.href = "detail.html";
        })
    }

}

//read product in basket
for (let i = 0; i < lis1.length; i++) {
    // alert(lis1[i]);
    try {
        const products = collection(db, "products");
        const q = query(products, where('idp', '==', lis1[i]));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            renderProduct(doc, i);
        })
    } catch (error) {
        throw error
    }
}
const raka = lisprice.reduce((a, b) => a + b, 0)
console.log('ราคา', raka)
ppayment.innerText = `ยอดรวม ${numberWithCommas(raka)} บาท`
sessionStorage.setItem("raka", raka);

const out = document.getElementById('out')
out.addEventListener('click', async (e) => {
    sessionStorage.removeItem("idu");
    sessionStorage.removeItem("ida");
    sessionStorage.removeItem("lis1");
    sessionStorage.removeItem("lis2");
    sessionStorage.removeItem("ida");
    window.location.href = "index.html";
})

// var srcprofile = sessionStorage.getItem("srcprofile");
// document.getElementById('profile33').src= srcprofile

const users = collection(db, "users");
const q = query(users, where('idu', '==', idu));
const querySnapshot = await getDocs(q);
querySnapshot.forEach(doc => {
    document.getElementById('profile33').src = doc.data().src
})

document.getElementById('btn1').addEventListener('click', async (e) => {
    if (lis1.length == 1) {
        alert('ซื้ออะไรก่อนสิ ท่านผู้เจริญ')
        window.location.href='product.html'
        document.getElementById('btn1').style.display = 'none'
    } else {
        window.location.href='payment.html'
    }
})