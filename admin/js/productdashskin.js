import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getFirestore,
  addDoc,
  query,
  where, 
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
          if (productData.Category === 'Skin Care') {
              products.push(productData);
          }
      }
      showProducts(products);
  });
}

fetchProducts();

// showProducts Function

function showProducts(products) {
  var tbody = document.getElementById("tbody");

  tbody.innerHTML = "";
  for (const prd of products) {
      tbody.innerHTML += `
          <tr>
              <td>${prd.id}</td>
              <td>${prd.Title}</td>
              <td>${prd.Description}</td>
              <td>${prd.Price}</td>
              <td><img src="${prd.ImageURL}" alt="Product Image" width="50"></td>
              <td>${prd.Brand}</td>
              <td>${prd.Category}</td>
              <td><button class="btn btn-danger" onClick="deletePrd('${prd.id}')">Delete</button></td>
              <td>
                  
                      <button class="btn btn-success" onClick="updateProd('${prd.id}','${prd.Title}','${prd.Description}','${prd.Price}','${prd.ImageURL}','${prd.Brand}','${prd.Category}')">Update</button>
              </td>
          </tr>
      `;
  }
}



  window.deletePrd = deletePrd
async function deletePrd(id) {
  var isAgree = confirm("Are you sure you want to delete?")
  if (isAgree) {
    try {
      await deleteDoc(doc(firestore, 'Product', id))
    } catch (error) {
      console.log(error)
    }
  }
}


window.updateProd = updateProd;
function updateProd(id, title, description, price, brand, category, imageURL) {
  document.getElementById("modalWrapper").style.display = "flex";
  document.body.classList.add("modal-active");

  document.getElementById("id").value = id;
  document.getElementById("title").value = title;
  document.getElementById("description").value = description;
  document.getElementById("brand").value = brand;
  document.getElementById("price").value = price;
  document.getElementById("category").value = category;
  document.getElementById("imgPreview").src = imageURL;
}

document.getElementById("updateproForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("id").value;
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const brand = document.getElementById("brand").value;
  const category = document.getElementById("category").value;

  const fileInput = document.getElementById("fileInput");
  let imageURL = document.getElementById("imgPreview").src; 

  try {
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const storageRef = ref(storage, 'ProductImages/' + file.name);
      await uploadBytes(storageRef, file);
      
      imageURL = await getDownloadURL(storageRef);
    }

    const prodDocRef = doc(firestore, "Product", id);
    await updateDoc(prodDocRef, {
      Title: title,
      Price: price,
      Description: description,
      Brand: brand,
      Category: category,
      ImageURL: imageURL 
    });
    
    alert("The Product is Updating ");

    document.getElementById("modalWrapper").style.display = "none";
    document.body.classList.remove("modal-active");

  } catch (error) {
    console.error("Error in Updating", error);
    alert("Error in Updating");
  }
  clear() 
});


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

// export { deletePrd, updateProd };
