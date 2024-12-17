// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
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

// Your web app's Firebase configuration
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
// Initialize Authentication
const auth = getAuth(app);
// Initialize Firestore
const firestore = getFirestore(app);
// Initialize storage
const storage = getStorage(app);

//Prevent default form submission to avoid page reload
document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();
  saveUsers();
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  return password.length >= 8;
}

function validatePhone(phone) {
  const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return re.test(phone);
}

const COUNTRY_LIST = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Côte d'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Sint Maarten",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Switzerland",
  "Syria",
  "Tajikistan",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Vietnam",
  "Yemen",
];

function validateCountry(country) {
  const countryName = country.trim();
  return COUNTRY_LIST.includes(countryName);
}

// saveUsers function
window.saveUsers = saveUsers;
async function saveUsers() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var country = document.getElementById("country").value;
  var password = document.getElementById("password").value;
  var fileInput = document.getElementById("fileInput");
  var file = fileInput.files[0];
  let imageURL = "";
  let role = "user"; // Default role set to user

  if (!validateEmail(email)) {
    document.getElementById("wrongEmail").textContent = "Invalid email format";
    document.getElementById("wrongEmail").style.display = "block";
    return;
  }

  if (!validatePassword(password)) {
    document.getElementById("wrongPass").textContent =
      "Password must be at least 8 characters long";
    document.getElementById("wrongPass").style.display = "block";
    return;
  }

  if (phone && !validatePhone(phone)) {
    document.getElementById("wrongPhone").textContent =
      "Invalid phone number format";
    document.getElementById("wrongPhone").style.display = "block";
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userUid = user.uid; // Get the UID of the authenticated user

    // await createUserWithEmailAndPassword(auth, email, password);

    // location.assign("./signIn.html")

    // onAuthStateChanged(auth, function (user) {
    //     if (user) {
    //         location.assign("./signIn.html")
    //     }
    // })

    if (file) {
      try {
        const storageRef = ref(storage, `uploaded_images/users/${file.name}`);
        await uploadBytes(storageRef, file); // Upload the file to Firebase Storage
        imageURL = await getDownloadURL(storageRef); // Get the download URL after upload
        document.getElementById("imgPrview").src = imageURL; // Set the image preview
        console.log("File available at", imageURL);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file. Please try again.");
      }
    }
    //add object
    const userObj = {
      Name: name,
      Email: email,
      phone: phone,
      Country: country,
      Password: password,
      ImageURL: imageURL,
      Role: role,
    };

    // await addDoc(collection(firestore, "User", userUid), userObj);

    // Correct collection reference: Use the collection "Users" and userUid as the document ID
    await setDoc(doc(firestore, "Users", userUid), userObj);

    alert("Registration successful!");

    clear();
    window.location.href = "./login.html"; // Redirect to sign-in page
  } catch (error) {
    console.error("Error registering user: ", error);
    alert("Registration failed. Please try again.");
  }
}

function showError(elementId, message) {
  document.getElementById(elementId).textContent = message;
  document.getElementById(elementId).style.display = "block";
}

//clear function
function clear() {
  //  id = document.getElementById("id").value = ""
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("country").value = "";
  document.getElementById("password").value = "";
  document.getElementById("fileInput").value = ""; // Add this line to clear the file input
  document.getElementById("imgPrview").src = "";
}


// Sign In function
document.getElementById("signinForm").addEventListener("submit", function (e) {
  e.preventDefault();
  signIn();
});

async function signIn() {
  const signEmail = document.getElementById("signEmail").value;
  const signPass = document.getElementById("signPass").value;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      signEmail,
      signPass
    );
    const user = userCredential.user;
    const userUid = user.uid;

    // Fetch the user document from Firestore to check their role
    const userDoc = await getDoc(doc(firestore, "Users", user.uid));

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const userRole = userData.Role;

      if (userRole === "admin") {
        // Redirect to the admin dashboard
        window.location.href = "../admin/userDash.html";
      } else {
        // Redirect to the user dashboard
        location.assign("./home.html");
      }
    } else {
      console.error("No such user document found!");
      alert("User data not found. Please contact support.");
    }
  } catch (error) {
    console.error("Error signing in:", error.message);
    alert("Invalid credentials or user does not exist. Please sign up.");
}
}


export { saveUsers, signIn };
