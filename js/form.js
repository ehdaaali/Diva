const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


// try {
//     async function checkSignUpForm() {
//         var regexRegeName = /^[a-zA-z]{3}\s[a-zA-Z]{3}$/;
//         var regexRegeEmail = /^[a-z]+[a-zA-Z0-9._]+(gmail|yahoo).com$/;
//         var regexRegePass = /^[a-zA-Z0-9\W]{8}$/;
//         var regexRegePhone = /^01(0|1|2|5)[0-9]{8}$/;
//         var regeName = document.getElementById("regeName").value;
//         var regeEmail = document.getElementById("regeEmail").value;
//         var regePhone = document.getElementById("regePhone").value;
//         var regePass = document.getElementById("regePass").value;
//         var wrongName = document.getElementById('wrongName');
//         var wrongEmail = document.getElementById('wrongEmail');
//         var wrongPhone = document.getElementById('wrongPhone');
//         var wrongPass = document.getElementById('wrongPass');
//         var noName = document.getElementById('noName');
//         var noEmail = document.getElementById('noEmail');
//         var noPass = document.getElementById('noPass');
//         var noPhone = document.getElementById('noPhone');
      
//         if (!regexRegeName.test(regeName)) {
      
//             wrongName.textContent = "Name is non valid";
//             noName.style.display = "block";
//             noName.style.color = "red"
//             regexRegeName.style.border = "1px solid red"
       
//         } else {
//             wrongName.textContent = "";
//             noName.style.display = "none";
//             regexRegeName.style.border = "1px solid #ced4da"
 
//         }
      
//         if (!regexRegeEmail.test(regeEmail)) {
//             wrongEmail.textContent = "Email is non valid";
//             noEmail.style.display = "block";
//             noEmail.style.color = "red"
//             regexRegeEmail.style.border = "1px solid red"
//         } else {
//             wrongEmail.textContent = "";
//             noEmail.style.display = "none";
//             regexRegeEmail.style.border = "1px solid #ced4da"
//         }
      
//         if (!regexRegePass.test(regePass)) {
//             wrongPass.textContent = "Password is non valid";
//             noPass.style.display = "block";
//             noPass.style.color = "red"
//             regexRegePass.style.border = "1px solid red"
        
//         } else {
//             wrongPass.textContent = "";
//             noPass.style.display = "none";
//             regexRegePass.style.border = "1px solid #ced4da"
        
//         }
      
//         if (!regexRegePhone.test(regePhone)) {
//             wrongPhone.textContent = "Phone is non valid";
//             noPhone.style.display = "block";
//             noPhone.style.color = "red"
//             regexRegePhone.style.border = "1px solid red"
//         } else {
//             wrongPhone.textContent = "";
//             noPhone.style.display = "none";
//             regexRegePhone.style.border = "1px solid #ced4da"

//         }
//         if (regexRegeName.test(regeName) && regexRegeEmail.test(regeEmail) && regexRegePass.test(regePass) && regexRegePhone.test(regePhone)) {
//             alert("Submit is successful");

//         }
//     }
// } catch (error) {
//     console.log('There was an error in submit:', error);
    
// }


// try {
//     async function checkSignUpForm() {
//         var regexRegeName = /^[a-zA-z]{3}\s[a-zA-Z]{3}$/;
//         var regexRegeEmail = /^[a-z]+[a-zA-Z0-9._]+(gmail|yahoo).com$/;
//         var regexRegePass = /^[a-zA-Z0-9\W]{8}$/;
//         var regexRegePhone = /^01(0|1|2|5)[0-9]{8}$/;
    
//         const regeName = document.getElementById("regeName").value;
//         const regeEmail = document.getElementById("regeEmail").value;
//         const regePhone = document.getElementById("regePhone").value;
//         const regePass = document.getElementById("regePass").value;

//         const wrongName = document.getElementById('wrongName');
//         const wrongEmail = document.getElementById('wrongEmail');
//         const wrongPhone = document.getElementById('wrongPhone');
//         const wrongPass = document.getElementById('wrongPass');

//         // Improved validation logic (example)
//         if (regeName.trim() === "") {
//             wrongName.textContent = "Please enter your name";
//         } else if (!regexRegeName.test(regeName)) {
//             wrongName.textContent = "Name can only contain letters and spaces";
//         } else {
//             wrongName.textContent = "";
//         }

//         if (regeEmail.trim() === "") {
//             wrongEmail.textContent = "Please enter your email address";
//         } else if (!regexRegeEmail.test(regeEmail)) {
//             wrongEmail.textContent = "Please enter a valid email address";
//         } else {
//             wrongEmail.textContent = "";
//         }

//         if (regePhone.trim() === "") {
//             wrongPhone.textContent = "Please enter your phone number";
//         } else if (!regexRegePhone.test(regePhone)) {
//             wrongPhone.textContent = "Please enter a valid phone number";
//         }

//         if (regePass.trim() === "") {
//             wrongPass.textContent = "Please enter your password";
//         } else if (!regexRegePass.test(regePass)) {
//             wrongPass.textContent = "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character";
//         } else {
//             wrongPass.textContent = "";
//         }
    
//         // Submit form only if all validations pass
//         if (wrongName.textContent === "" && wrongEmail.textContent === "" && wrongPhone.textContent === "" && wrongPass.textContent === "") {
//             await submitForm();
//         }
    
//         // Handle form submission (example)
//         async function submitForm() {
//             // Simulate form submission
//             await new Promise(resolve => setTimeout(resolve, 2000));
//             alert("Form submitted successfully");
//             // Reset form fields
//             document.getElementById("regeName").value = "";
//             document.getElementById("regeEmail").value = "";
//             document.getElementById("regePhone").value = "";
//             document.getElementById("regePass").value = "";
//             wrongName.textContent = "";
//             wrongEmail.textContent = "";
//             wrongPhone.textContent = "";
//             wrongPass.textContent = "";
//             noName.style.display = "none";
//             noEmail.style.display = "none";
//             noPhone.style.display = "none";
//             noPass.style.display = "none";
//         }
    
//         // Handle unsuccessful validation (example)
//         if (wrongName.textContent !== "" || wrongEmail.textContent !== "" || wrongPhone.textContent !== "" || wrongPass.textContent !== "") {
//             alert("Form submission failed due to validation errors.");
//         }
//     }  
// } catch (error) {
//     console.error('There was an error in submit:', error);
    
//  }
