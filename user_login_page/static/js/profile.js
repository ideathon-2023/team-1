// Your Firebase configuration for the profile page (same as before)
const firebaseConfig = {
    apiKey: "AIzaSyDbwtKNrll7Dn1uUa4rwws30zs0KpYrgvg",
    authDomain: "web-ideathon-2023.firebaseapp.com",
    projectId: "web-ideathon-2023",
    storageBucket: "web-ideathon-2023.appspot.com",
    messagingSenderId: "958384197551",
    appId: "1:958384197551:web:931cf6efca0311b38ce95a",
    measurementId: "G-PXC58DS6DY"
};

// Initialize Firebase for the profile page (same as before)
const app = firebase.initializeApp(firebaseConfig);

function fetchUserProfileData() {
    const user = firebase.auth().currentUser;
    if (user) {
        const uid = user.uid;
        const usersRef = firebase.firestore().collection("users").doc(uid);
        usersRef.get().then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                // Update the profile page with user's data
                document.getElementById("displayName").innerText = data.displayName;
                document.getElementById("branch").innerText = data.branch;
                document.getElementById("yearOfGraduation").innerText = data.yearOfGraduation;
                document.getElementById("role").innerText = data.role;
            } else {
                console.log("No user data found.");
            }
        }).catch((error) => {
            console.error("Error fetching user data:", error);
        });
    }
}

// Call the function to fetch and update user's profile data on page load
fetchUserProfileData();
