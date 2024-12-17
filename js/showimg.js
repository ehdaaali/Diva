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
        var products = []
        for (const doc of snapshot.docs) {
          const productData = { id: doc.id, ...doc.data() };
          if (productData.Category === 'Skin Care') {
              products.push(productData);
          }
      }
        showimg(products);
      })
  }
  fetchProducts();


    function showimg(products) {
    var imgCard = document.getElementById('image-collage');  
      
    imgCard.innerHTML = "";
    const limitedProducts = products.slice(0, 3)
    for (const prd of limitedProducts) {
       
         imgCard.innerHTML += `
        
            <img src="${prd.ImageURL}" class="collage-img" alt="${prd.title}">

      `;

    };
  }