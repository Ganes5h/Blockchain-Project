// const nodemailer = require("nodemailer");

// const sendRegisterEmail = async (options) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail", // or another service
//     auth: {
//       user: process.env.SMTP_USER, // Your email address
//       pass: process.env.SMTP_PASS, // Your email password or App password
//     },
//   });

//   const mailOptions = {
//     from: options.useremail, // Sender's email address
//     to: process.env.SMTP_USER,
//     subject: options.subject,
//     text: options.message,
//     // html: options.html, // Uncomment if you want to send HTML content
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("Email sent successfully");
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw new Error("Email could not be sent");
//   }
// };

// module.exports = sendRegisterEmail;

const nodemailer = require("nodemailer");

const sendRegisterEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or another service
    auth: {
      user: process.env.SMTP_USER, // Your email address
      pass: process.env.SMTP_PASS, // Your email password or App password
    },
  });

  // Construct the email content
  const emailContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <p>Dear Admin,</p>
      <p>A new user with the email address <strong>${options.useremail}</strong> has requested registration on the platform.</p>
      <p>Please review their documents and approve or reject their request as appropriate. Here are the details:</p>
      <ul>
        <li><strong>Username:</strong> ${options.username}</li>
        <li><strong>Full Name:</strong> ${options.fullName}</li>
        <li><strong>Role:</strong> ${options.role}</li>
        <li><strong>Organization:</strong> ${options.organization}</li>
      </ul>
      <p>If you have any questions or need further assistance, please contact us.</p>
      <p>Thank you for your attention to this matter.</p>
      <p>Best regards,</p>
      <p>${options.organization}</p>
      <p><a href="mailto:${options.useremail}">${options.useremail}</a></p>
    </div>
  `;

  const mailOptions = {
    from: options.useremail, // Sender's email address
    to: process.env.SMTP_USER, // Admin's email address
    subject: options.subject,
    html: emailContent, // Use HTML content for the email
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email could not be sent");
  }
};

module.exports = sendRegisterEmail;
