// let ratingStarInput = [...document.querySelectorAll('.r-star')];

// ratingStarInput.map((star, index) => {
//     star.addEventListener('click', () => {
//         for (let i = 0; i < 5 ; i++) {
//             if (i <= index) {
//                 ratingStarInput[i].src = `images/star.png`;
//             }else{
//                 ratingStarInput[i].src = `images/staro.png`;
//             }   
//         }
//     })
// })

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getFirestore,
  addDoc,
  getDoc,
  updateDoc,
  collection,
  onSnapshot,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";

// import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js"

const firebaseConfig = {
    apiKey: "AIzaSyB62d8FtJeTUfcbFCs0HhzLMgf32CD82yk",
    authDomain: "diva-cd2d3.firebaseapp.com",
    projectId: "diva-cd2d3",
    storageBucket: "diva-cd2d3.appspot.com",
    messagingSenderId: "752108842622",
    appId: "1:752108842622:web:1fa4612b85904fcd1e722f",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

// Initialize Srorage
const storage = getStorage(app);

// to fetch data in front side
function fetchProducts() {

    onSnapshot(collection(firestore, 'Product'), function (snapshot) {
        var products = [];
        for (const doc of snapshot.docs) {
            products.push({ id: doc.id, ...doc.data() });
        }
        // console.log(products); // تحقق من البيانات المستردة
        showProductDetails(products); // تمرير جميع المنتجات
    }, function (error) {
        console.error("Error fetching products:", error); // معالجة الأخطاء
    });

      
  }
  fetchProducts();


  


const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

console.log(productId); 

if (productId) {
    const productRef = doc(firestore, 'Product', productId);
    
    getDoc(productRef).then((doc) => {
        if (doc.exists()) {
            const product = { id: doc.id, ...doc.data() };
            showProductDetails(product);
        } else {
            console.error('No such document!');
        }
    }).catch((error) => {
        console.error('Error getting document:', error);
    });
}

function showProductDetails(product) {
    const productDetailContainer = document.getElementById('product-detail-container');
    productDetailContainer.innerHTML = `
                <div class="img-img">
                        <img src="${product.ImageURL}" class="product-image" alt="">

                </div>
            
            <div class="product-detail ">
                <h1 class="product-title">${product.Title}</h1>
                <p class="product-des"> ${product.Description}</p>
                
                <p class="price"> $${product.Price}</p>   
                <div class="btn">
                
                    <a href=""><button class="product-btn buy-btn"  onClick="deletePrd('${product.id}')"> buy now</button></a>
                    <button class="product-btn cart-btn" onClick="addToCart({ id: '${product.id}', Title: '${product.Title}', Price: ${product.Price}, ImageURL: '${product.ImageURL}' })"> Alrady added to cart</button>

                </div> 
            </div> 
    `;
}

                    // <a href="login.html">button class="product-btn buy-btn" onClick="deletePrd('${product.id}')"> buy now</button></a>
                    // <a href="#"><p class="product-btn cart-btn cart-btn" onClick="addToCart({ id: '${prd.id}', Title: '${prd.Title}', Price: ${prd.Price}, ImageURL: '${prd.ImageURL}' })">add<i class="ri-shopping-cart-2-line"></i></p></a>
                    // <button class="product-btn cart-btn" onClick="addToCart({ id: '${prd.id}', Title: '${prd.Title}', Price: ${prd.Price}, ImageURL: '${prd.ImageURL}' })"> add to cart</button>
