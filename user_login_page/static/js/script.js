// Your Firebase configuration (same as before)
const firebaseConfig = {
    apiKey: "AIzaSyDbwtKNrll7Dn1uUa4rwws30zs0KpYrgvg",
    authDomain: "web-ideathon-2023.firebaseapp.com",
    projectId: "web-ideathon-2023",
    storageBucket: "web-ideathon-2023.appspot.com",
    messagingSenderId: "958384197551",
    appId: "1:958384197551:web:931cf6efca0311b38ce95a",
    measurementId: "G-PXC58DS6DY"
};

// Initialize Firebase (same as before)
const app = firebase.initializeApp(firebaseConfig);

// Your Firebase configuration and initialization code here
// Your Firebase configuration and initialization code here
// ...

const registrationForm = document.getElementById("registrationForm");
registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // Get user registration data from the form
  const email = registrationForm.email.value;
  const password = registrationForm.password.value;
  const displayName = registrationForm.displayName.value;
  const branch = registrationForm.branch.value;
  const yearOfGraduation = registrationForm.yearOfGraduation.value;
  const role = registrationForm.role.value;

  // Use Firebase Auth API to register the user with email and password
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Store additional user data in Firestore
      return firebase.firestore().collection("users").doc(userCredential.user.uid).set({
        displayName: displayName,
        branch: branch,
        yearOfGraduation: yearOfGraduation,
        role: role,
        approved: false // Set the initial approval status to false
      });
    })
    .then(() => {
      // Redirect the user to a pending approval page or show a message
      // indicating that their account is pending approval
      window.location.href = "/pending-approval";
    })
    .catch((error) => {
      // Handle any errors that occur during registration
      console.error("Error registering user:", error);
    });
});
