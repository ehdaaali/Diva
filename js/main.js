
// Import the functions you need from the SDKs you need

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

// const getFirestore = getFirestore(app);


window.saveProducts = saveProducts
async function saveProducts() {
  var id = document.getElementById("id").value
  var title = document.getElementById("title").value
  var description = document.getElementById("description").value
  var price = document.getElementById("price").value
  var fileInput = document.getElementById("fileInput");
  var file = fileInput.files[0];
  var brand = document.getElementById("brand").value;
  var category = document.getElementById("category").value;
  let imageURL = "";


  if (file) {
    // رفع الصورة إلى Firebase Storage
    var storageRef = ref(storage, `uploaded_images/${file.name}`);
    await uploadBytes(storageRef, file);
    imageURL = await getDownloadURL(storageRef);

    const imgPrview = document.getElementById("imgPrview");
    imgPrview.src = imageURL;

    console.log('File available at', imageURL);
  }


  var product = {
    Title: title,
    Description: description,
    Price: price,
    ImageURL: imageURL,
    Brand: brand,
    Category: category
  }

  if (id == "") {
    // add Product
    await addDoc(collection(firestore, 'Product'), product);

    clear();

  } else {
    // Update
    await updateDoc(doc(firestore, 'Product', id), product)

  }





}

function clear() {

  document.getElementById("id").value = ""
  document.getElementById("title").value = ""
  document.getElementById("description").value = ""
  document.getElementById("price").value = ""
  document.getElementById("fileInput").value = ""; // Add this line to clear the file input
  document.getElementById("imgPrview").src = "";
  document.getElementById("brand").value = "Choose ...";
  document.getElementById("category").value = "Choose ..."
}

// onSnapshot(collection(firestore, 'Product'), function (snapshot) {
//   var products = []
//   for (const doc of snapshot.docs) {
//     products.push({ id: doc.id, ...doc.data() });
//   }
//   showProducts(products);
// })










// استدعاء الدالة لعرض 3 منتجات فقط
// showcard(products);



