const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer"); // Import nodemailer package

admin.initializeApp();

// Configure the email transport
const transporter = nodemailer.createTransport({
  service: "Gmail", // Replace with your email provider (e.g., "Outlook", "Yahoo", etc.)
  auth: {
    user: "pecproject2023@gmail.com", // Replace with your email address
    pass: "PEC2023project", // Replace with your email password or an app-specific password
  },
});

// Cloud Function to notify admin about new user registration
exports.adminApprovalNotification = functions.firestore.document("users/{userId}")
  .onCreate((snapshot, context) => {
    const newUser = snapshot.data();

    // Check if the user's role is "admin" and is approved by the admin
    if (newUser.role === "admin" && newUser.approvedByAdmin === true) {
      // Send an email to the user
      const mailOptions = {
        from: "pecproject2023@gmail.com", // Replace with your email address
        to: newUser.email,
        subject: "Account Approval",
        text: `Hello ${newUser.displayName}, your account has been approved by the admin. Your login credentials are:\nEmail: ${newUser.email}\nPassword: ${newUser.password}`,
      };

      return transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent successfully.", info.response);
        }
      });
    } else {
      // If the user's role is not "admin" or is not approved by the admin, delete the user account
      return admin.auth().deleteUser(context.params.userId)
        .then(() => {
          return console.log("User account deleted.");
        })
        .catch((error) => {
          return console.error("Error deleting user account:", error);
        });
    }
  });
