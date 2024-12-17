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
            const productData = { id: doc.id, ...doc.data() };
            // تحقق مما إذا كانت الفئة هي "skin care"
            if (productData.Category === 'Skin Care') {
                products.push(productData);
            }
        }
        // showProducts(products);
    });
  }
  fetchProducts();

//shoProduct Function


document.addEventListener('DOMContentLoaded', async function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const productId = urlParams.get('id');

  if (productId) {
      // Fetch the product from Firestore using the ID
      const productRef = doc(firestore, 'Product', productId);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
          const productData = productSnap.data();
          // Fill the form with product data
          document.getElementById("id").value = productId;
          document.getElementById("title").value = productData.Title;
          document.getElementById("description").value = productData.Description;
          document.getElementById("price").value = productData.Price;
          document.getElementById("imgPrview").src = productData.ImageURL;
          document.getElementById("brand").value = productData.Brand;
          document.getElementById("category").value = productData.Category;
      } else {
          console.log("No such document!");
      }
  }
});
window.updateProd = async function (event) {
  event.preventDefault();  // Prevent the form from submitting and refreshing the page

  // Get the form input values
  const id = document.getElementById("id").value;
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const brand = document.getElementById("brand").value;
  const category = document.getElementById("category").value;
  
  // Optional: Handle file upload if a new image is selected
  const fileInput = document.getElementById("fileInput");
  let imageURL = document.getElementById("imgPrview").src;

  if (fileInput.files.length > 0) {
      // If a new file is selected, upload it to Firebase Storage
      const file = fileInput.files[0];
      const storageRef = ref(storage, 'ProductImages/' + file.name);
      await uploadBytes(storageRef, file);

      // Get the download URL of the uploaded file
      imageURL = await getDownloadURL(storageRef);
  }

  // Update the Firestore document with the new data
  try {
      const productRef = doc(firestore, 'Product', id);
      await updateDoc(productRef, {
          Title: title,
          Description: description,
          Price: price,
          ImageURL: imageURL,  // Use the updated imageURL or the existing one
          Brand: brand,
          Category: category
      });

      alert("Product updated successfully!");
  } catch (error) {
      console.error("Error updating product: ", error);
  }
}



// export { deletePrd, updateProd };
