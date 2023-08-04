// Function to approve a user by updating the Firestore document
async function approveUser(userId) {
    try {
        await firebase.firestore().collection("users").doc(userId).update({
            approvedByAdmin: true
        });
        alert("User approved successfully!");
    } catch (error) {
        console.error("Error approving user:", error);
    }
}

// Function to reject a user by deleting the Firestore document
async function rejectUser(userId) {
    try {
        await firebase.firestore().collection("users").doc(userId).delete();
        alert("User rejected successfully!");
    } catch (error) {
        console.error("Error rejecting user:", error);
    }
}

// Attach event listeners to the user list items
const userList = document.getElementById("userList");
userList.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        const userId = event.target.dataset.userId;
        const action = prompt("Enter 'approve' to approve the user or 'reject' to reject the user:");
        if (action === "approve") {
            approveUser(userId);
        } else if (action === "reject") {
            rejectUser(userId);
        } else {
            alert("Invalid action!");
        }
    }
});
