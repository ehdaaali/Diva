import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getFirestore,
  addDoc,
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
            const productData = { id: doc.id, ...doc.data() };
            // تحقق مما إذا كانت الفئة هي "skin care"
            if (productData.Category === 'Skin Care') {
                products.push(productData);
            }
        }
        showProduct(products);
    });
  }
  fetchProducts();

// shoProduct Function

//   function showProduct(products) {
//     var productCard = document.getElementById('product-container');    
//     productCard.innerHTML = "";
//     const limitedProducts = products.slice(0, 9)
//     for (const prd of limitedProducts) {
       
//          productCard.innerHTML += `
//         <div class="product-card">
//           <img src="${prd.ImageURL}" class="product-img" alt="${prd.title}">
//             <a href="detailsProduct.html"><p class="product-name">$${prd.Price}<i class="ri-arrow-right-line"></i></p></a>
//         </div>
//       `;

//     };
//   }

function showProduct(products) {
    var productCard = document.getElementById('product-container');    
    productCard.innerHTML = "";
    const limitedProducts = products.slice(0, 3); // استعراض 9 منتجات فقط
    for (const prd of limitedProducts) {
        productCard.innerHTML += `
        <div class="product-card">
          <img src="${prd.ImageURL}" class="product-img" alt="${prd.title}">
          <a href="?id=${prd.id}"><p class="product-cart product-name">Add<i class="ri-shopping-cart-2-line"></i></p></a>
          <a href="detailsProduct.html?id=${prd.id}"><p class="product-name">$${prd.Price}<i class="ri-arrow-right-line"></i></p></a>
        </div>
      `;
    }
}







  


