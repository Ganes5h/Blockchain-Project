// const nodemailer = require("nodemailer");

// const sendEmail = async (options) => {
//   // 1) Create a transporter
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });

//   // 2) Define the email options
//   const mailOptions = {
//     from: process.env.SMTP_USER,
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//     // html: options.html, // Uncomment this if you want to send HTML content
//   };

//   // 3) Actually send the email
//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;

const nodemailer = require("nodemailer");

/**
 * Sends an email using Nodemailer.
 *
 * @param {Object} options - Email options.
 * @param {string} options.email - Recipient's email address.
 * @param {string} options.subject - Subject of the email.
 * @param {string} options.message - Plain text message body (used as fallback).
 * @param {string} [options.html] - Optional HTML content for the email.
 *
 * @returns {Promise<void>}
 */
const sendEmail = async (options) => {
  // 1) Create a transporter using Gmail service
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER, // Your Gmail address
      pass: process.env.SMTP_PASS, // Your Gmail password or App password
    },
  });

  // 2) Define the email options with HTML content
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: options.email,
    subject: options.subject,
    text: options.message, // Plain text fallback
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      
            <h2 style="color: #4CAF50; text-align: center;">Password Reset Request</h2>
            <p style="color: #333;">Hello ${options.name},</p>
            <p style="color: #333;">We received a request to reset your password. Use the OTP below to reset your password:</p>
            <div style="text-align: center; margin: 20px 0;">
              <h3 style="background: #4CAF50; padding: 15px; border-radius: 8px; color: #ffffff; display: inline-block;">${options.otp}</h3>
            </div>
            <p style="color: #333;">This OTP is valid for <strong>2 minutes</strong>. Please enter it on the password reset page within this time frame.</p>
            <p style="color: #333;">If you did not request a password reset, please ignore this email.</p>
            <p style="color: #333;">Thank you,</p>
            <p style="color: #4CAF50; font-weight: bold;">© All rights reserverd | Secure Certify</p>
            <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;" />
            <p style="font-size: 12px; color: #777; text-align: center;">If you have any questions, please contact our support team.</p>
          </div>
        </body>
      </html>
    `,
  };

  // 3) Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email could not be sent");
  }
};

module.exports = sendEmail;
