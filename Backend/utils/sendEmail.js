const nodemailer = require("nodemailer");
const generateCertificatePDF = require("./pdfGenerator");
const Certificate = require("../models/certificateModel");

const sendCertificateEmail = async (
  recipientEmail,
  recipientName,
  courseName,
  issueDate,
  qrCodeUrl,
  issuerName,
  certificateHash
) => {
  // Generate PDF and save it to the uploads/certificates folder
  const pdfPath = await generateCertificatePDF(
    recipientName,
    courseName,
    issueDate,
    qrCodeUrl,
    issuerName,
    certificateHash
  );

  // Create a transport object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Set up email data
  let mailOptions = {
    from: process.env.SMTP_USER,
    to: recipientEmail,
    subject: "Your Certificate of Completion",
    text: `Dear ${recipientName},\n\nCongratulations on completing the ${courseName} course !\nPlease find attached your Certificate of Completion.\n\nFor further details and to secure your certificate into your DigiLocker, please visit our website. \n\nBest regards,\n© All rights reserverd | Secure Certify`,
    // text: `Dear ${recipientName},\n\nPlease find attached your Certificate of Completion for the course ${courseName}.\n\nBest regards,\nYour Company`,
    attachments: [
      {
        filename: "certificate.pdf",
        path: pdfPath, // Attach the file from the saved path
        contentType: "application/pdf",
      },
    ],
  };

  // Send email
  await transporter.sendMail(mailOptions);

  await Certificate.findOneAndUpdate(
    { certificateHash },
    { pdfPath },
    { new: true, upsert: true }
  );
};

module.exports = sendCertificateEmail;
