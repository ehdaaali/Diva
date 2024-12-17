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
          if (productData.Category === 'Sport') {
              products.push(productData);
          }
      }
      showProduct(products);
  });
}
  fetchProducts();

//shoProduct Function

  function showProduct(products) {
    var productCard = document.getElementById('col');    
    productCard.innerHTML = "";
    const limitedProducts = products.slice(0, 3)
    for (const prd of limitedProducts) {
        console.log(prd.id); 
         productCard.innerHTML += `
                    <div class="col" >
        <div class="col-img">
                            <img src="${prd.ImageURL}" alt="${prd.Title}">
                        </div>
                        <div class="col-icon">
                            <a href="#"><i class="ri-heart-line"></i></a>
                            <a href="detailsSport.html?id=${prd.id}"><i class="ri-eye-line"></i></a>
                            <a href="?id=${prd.id}"><i class="ri-shopping-cart-line"></i></a>
                        </div>
                    </div>

      `;

    };
  }
  