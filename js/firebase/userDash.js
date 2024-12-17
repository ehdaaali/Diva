import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import {
  getFirestore,
  addDoc,
  collection,
  getDoc,
  onSnapshot,
  deleteDoc,
  setDoc,
  doc,
  updateDoc,
  // query,
  // getDocs,
  // where,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyB62d8FtJeTUfcbFCs0HhzLMgf32CD82yk",
  authDomain: "diva-cd2d3.firebaseapp.com",
  projectId: "diva-cd2d3",
  storageBucket: "diva-cd2d3.appspot.com",
  messagingSenderId: "752108842622",
  appId: "1:752108842622:web:1fa4612b85904fcd1e722f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Auth
const auth = getAuth(app);
// Initialize Firestore
const firestore = getFirestore(app);
// Initialize storage
const storage = getStorage(app);

let isLoggingOut = false; // This flag will suppress the alert during log-out

// Function to handle user sign-in and sign-out state
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user.email);
    document.getElementById("logoutBtn").style.display = "block"; // Show logout button
  } else {
    if (!isLoggingOut) {
      // Only alert if the user is not in the process of logging out
      console.log("No user is signed in");
      // alert("Please sign in first!");
      window.location.href = "login.html"; // Redirect to login page
    }
  }
});

// Logout function
function handleLogout() {
  isLoggingOut = true; // Set the flag before logging out
  signOut(auth)
    .then(() => {
      alert("User logged out successfully!");
      window.location.href = "../login.html"; // Redirect to login page
    })
    .catch((error) => {
      console.error("Error during logout:", error);
      alert("Failed to logout. Please try again.");
    })
    .finally(() => {
      isLoggingOut = false; // Reset the flag after log-out process finishes
    });
}

// Attach logout function to button
document.getElementById("logoutBtn").addEventListener("click", handleLogout);


function fetchSignedInUser() {
  // Use onAuthStateChanged to ensure Firebase has fully initialized the auth state
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // The user is signed in, get their UID
      const userUid = user.uid;

      try {
        // Fetch the user document from Firestore using their UID
        const userDoc = await getDoc(doc(firestore, "Users", userUid));

        if (userDoc.exists()) {
          // Get user data
          const userData = userDoc.data();

          // Update the DOM with the user's data
          const userNameElement = document.querySelector(".welcomeUser span");
          const userImageElement = document.querySelector(".welcomeUser img");

          // Check if these elements exist before updating them
          if (userNameElement) {
            userNameElement.textContent = `Welcome, ${userData.Name}`;
          } else {
            console.error("User name element not found");
          }

          if (userImageElement) {
            userImageElement.src = userData.ImageURL;
            userImageElement.alt = `${userData.Name}'s profile picture`;
          } else {
            console.error("User image element not found");
          }
        } else {
          console.error("No such user document found!");
          alert("User data not found. Please contact support.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to fetch user data.");
      }
    } else {
      // No user is signed in
      console.error("No user is signed in.");
      // alert("Please sign in first.");
    }
  });
}

// Call this function to fetch the user data after checking if they're signed in
fetchSignedInUser();

// to fetch data in front side
function fetchUsers() {
  onSnapshot(collection(firestore, "Users"), function (snapshot) {
    var users = [];
    for (const doc of snapshot.docs) {
      users.push({ id: doc.id, ...doc.data() });
    }
  showUsers(users);
    
  });
}
fetchUsers();

//showUser Function

function showUsers(users) {
 
    // // Get the elements for updating the DOM
    // const userNameElement = document.querySelector(".welcomeUser span");
    // const userImageElement = document.querySelector(".welcomeUser img");

    // // Check if these elements exist before updating them
    // if (userNameElement) {
    //   userNameElement.textContent = `Welcome, ${userName}`;
    // } else {
    //   console.error("User name element not found");
    // }
     
    var tbody = document.getElementById("userTbody");
    tbody.innerHTML = "";
  for (const user of users) {
      const userNameElement = document.querySelector(".welcomeUser span");
    const userImageElement = document.querySelector(".welcomeUser img");

    // Check if these elements exist before updating them
    if (userNameElement) {
      userNameElement.textContent = `Welcome, ${user.Name}`;
      userImageElement.src = `${user.ImageURL}`;
    } else {
      console.error("User name element not found");
    }
      tbody.innerHTML += `
                          <tr>
                              <td>${user.id}</td>
                              <td>${user.Name}</td>
                              <td>${user.Email}</td>
                              <td>${user.phone}</td>
                               <td><img src="${user.ImageURL}" alt="Product Image" width="70" ></td>
                              <td>${user.Country}</td>                             
                              <td>${user.Role}</td>                             
                              <td><button class="btn btn-danger" onClick="deleteUser('${user.id}')">Delete</button></td>
                              <td><button class="btn btn-success" onClick="updatetUser('${user.id}', '${user.Name}', '${user.Email}', '${user.phone}', '${user.Country}', '${user.Role}', '${user.ImageURL}')">Edit</button></td>
                               
                          </tr>
                      `;
     
    }
  }


// Delete user function
        window.deleteUser = deleteUser
        async function deleteUser(id) {
            var isAgree = confirm("Are you sure you want to delete ?")
            if (isAgree) {
                try {
                  await deleteDoc(doc(firestore, 'Users', id))
                } catch (error) {
                    console.log(error);
                }
          }
          
        }

      // Update user function (make form visible and pre-fill fields)
/// Update user function (make form visible and pre-fill fields)
window.updatetUser = updatetUser;
function updatetUser(id, name, email, phone, country, role, imageURL) {
  // Show the modal
  document.getElementById("modalWrapper").style.display = "flex";
  document.body.classList.add("modal-active");
  // document.getElementById("main").style.display = "none";
  // document.getElementById("sideNav").style.display = "none";

  // Pre-fill the form with user data
  document.getElementById("id").value = id;
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("phone").value = phone; // Fix: phone (lowercase "p")

  document.getElementById("country").value = country;
  document.getElementById("role").value = role;
  document.getElementById("imgPreview").src = imageURL;
}

// Handle form submission
document.getElementById("updateUserForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  // Get updated values from the form
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const country = document.getElementById("country").value;
  const role = document.getElementById("role").value;
  
  // Handle the image upload if a new image is selected
  const fileInput = document.getElementById("fileInput").files[0];
  let imageURL = document.getElementById("imgPreview").src; // Default to current image
  
  try {
    // If a new image is uploaded, upload it to Firebase Storage
    if (fileInput) {
      const imageRef = ref(storage, `users/${id}/${fileInput.name}`);
      await uploadBytes(imageRef, fileInput);
      imageURL = await getDownloadURL(imageRef);
    }

    // Update the user document in Firestore
    const userDocRef = doc(firestore, "Users", id);
    await updateDoc(userDocRef, {
      Name: name,
      Email: email,
      phone: phone,
      Country: country,
      ImageURL: imageURL,
      Role: role// Update the image URL if changed
    });
    
    alert("User updated successfully!");

    // Hide the modal and reset the form
    document.getElementById("modalWrapper").style.display = "none";
    document.body.classList.remove("modal-active");
    
    // Optionally, refresh the users list to show updated data
    // fetchUsers();
  } catch (error) {
    console.error("Error updating user:", error);
    alert("Failed to update user.");
  }
});




export { deleteUser, updatetUser };
