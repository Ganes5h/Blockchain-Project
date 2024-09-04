const nodemailer = require("nodemailer");

const sendVerificationEmail = async (options) => {
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
      <p>Dear ${options.userName}</p>
      <p>${options.message}</p>
      <p>Thank you for your patience.</p>
      <p>Best regards,</p>
      <p>Secure Certify | All rights reserverd</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.SMTP_USER, // Admin's email address
    to: options.email, // User's email address
    subject: options.subject,
    html: emailContent, // Use HTML content for the email
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Verification email could not be sent");
  }
};

module.exports = sendVerificationEmail;
