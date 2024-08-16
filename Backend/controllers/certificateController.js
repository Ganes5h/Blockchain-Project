// const Certificate = require("../models/certificateModel");
// const { contract, web3 } = require("../utils/web3");
// //  require("../utils/web3");

// exports.issueCertificate = async (req, res) => {
//   try {
//     const { studentName, courseName, issuerName } = req.body;

//     // Validate input
//     if (!studentName || !courseName || !issuerName) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // Get accounts
//     const accounts = await web3.eth.getAccounts();
//     if (accounts.length === 0) {
//       return res.status(500).json({ message: "No accounts available" });
//     }

//     // Estimate gas
//     const gasEstimate = await contract.methods
//       .issueCertificate(studentName, courseName, issuerName)
//       .estimateGas({ from: accounts[0] });

//     // Send transaction
//     const result = await contract.methods
//       .issueCertificate(studentName, courseName, issuerName)
//       .send({ from: accounts[0], gas: gasEstimate });

//     // Get certificate hash from event
//     if (!result.events || !result.events.CertificateIssued) {
//       return res
//         .status(500)
//         .json({ message: "CertificateIssued event not found" });
//     }
//     const certificateHash =
//       result.events.CertificateIssued.returnValues.certificateHash;

//     // Save certificate to database
//     const newCertificate = new Certificate({
//       certificateHash,
//       studentName,
//       courseName,
//       issuerName,
//       issueDate: new Date(),
//       isValid: true,
//     });

//     await newCertificate.save();

//     // Respond with success
//     res
//       .status(200)
//       .json({ message: "Certificate issued successfully", certificateHash });
//   } catch (error) {
//     // Log error details (optional, for debugging)
//     console.error("Error issuing certificate:", error);

//     // Respond with error message
//     res
//       .status(500)
//       .json({ message: "Failed to issue certificate", error: error.message });
//   }
// };

// exports.validateCertificate = async (req, res) => {
//   try {
//     const { certificateHash } = req.params;

//     if (!certificateHash) {
//       return res.status(400).json({ message: "Certificate hash is required" });
//     }

//     // Call smart contract to check validity
//     const isValid = await contract.methods
//       .validateCertificate(certificateHash)
//       .call();

//     // Respond with the result
//     res.status(200).json({ isValid });
//   } catch (error) {
//     console.error("Error validating certificate:", error);
//     res.status(500).json({
//       message: "Failed to validate certificate",
//       error: error.message,
//     });
//   }
// };

// exports.revokeCertificate = async (req, res) => {
//   try {
//     const { certificateHash } = req.params;

//     if (!certificateHash) {
//       return res.status(400).json({ message: "Certificate hash is required" });
//     }

//     // Get accounts
//     const accounts = await web3.eth.getAccounts();
//     if (accounts.length === 0) {
//       return res.status(500).json({ message: "No accounts available" });
//     }

//     // Estimate gas
//     const gasEstimate = await contract.methods
//       .revokeCertificate(certificateHash)
//       .estimateGas({ from: accounts[0] });

//     // Revoke certificate
//     await contract.methods
//       .revokeCertificate(certificateHash)
//       .send({ from: accounts[0], gas: gasEstimate });

//     // Update certificate status in the database
//     await Certificate.updateOne({ certificateHash }, { isValid: false });

//     res.status(200).json({ message: "Certificate revoked successfully" });
//   } catch (error) {
//     console.error("Error revoking certificate:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to revoke certificate", error: error.message });
//   }
// };

// exports.getCertificateData = async (req, res) => {
//   try {
//     const { certificateHash } = req.params;

//     if (!certificateHash) {
//       return res.status(400).json({ message: "Certificate hash is required" });
//     }

//     // Retrieve certificate from the database
//     const certificate = await Certificate.findOne({ certificateHash });

//     if (!certificate) {
//       return res.status(404).json({ message: "Certificate not found" });
//     }

//     // Respond with the certificate data
//     res.status(200).json(certificate);
//   } catch (error) {
//     console.error("Error retrieving certificate data:", error);
//     res
//       .status(500)
//       .json({
//         message: "Failed to retrieve certificate data",
//         error: error.message,
//       });
//   }
// };

const Certificate = require("../models/certificateModel");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const nodemailer = require("nodemailer");
const { contract, web3 } = require("../utils/web3");
const multer = require("multer");
const path = require("path");
const QRCode = require("qrcode");
const user = require("../models/userModel");
const sendCertificateEmail = require("../utils/sendEmail");
const mongoose = require("mongoose");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/qrCodes/"); // Folder to store uploaded QR code images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid filename conflicts
  },
});

const upload = multer({ storage: storage }).single("qrCodeImage");

const DEFAULT_GAS_LIMIT = 3000000; // Increased gas limit

// exports.issueCertificate = async (req, res) => {
//   try {
//     const { studentName, courseName, issuerName } = req.body;

//     if (!studentName || !courseName || !issuerName) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const accounts = await web3.eth.getAccounts();
//     if (accounts.length === 0) {
//       return res.status(500).json({ message: "No accounts available" });
//     }

//     // Estimate gas
//     const gasEstimate = await contract.methods
//       .issueCertificate(studentName, courseName, issuerName)
//       .estimateGas({ from: accounts[0] });

//     // Convert BigInt to Number (if applicable)
//     const gasLimit = Number(gasEstimate) || DEFAULT_GAS_LIMIT;

//     const result = await contract.methods
//       .issueCertificate(studentName, courseName, issuerName)
//       .send({ from: accounts[0], gas: gasLimit });

//     if (!result.events || !result.events.CertificateIssued) {
//       return res
//         .status(500)
//         .json({ message: "CertificateIssued event not found" });
//     }
//     const certificateHash =
//       result.events.CertificateIssued.returnValues.certificateHash;

//     // Generate QR code
//     const qrCodeData = certificateHash;
//     const qrCodeImagePath = path.join(
//       "uploads/qrCodes",
//       `${certificateHash}.png`
//     );

//     await QRCode.toFile(qrCodeImagePath, qrCodeData, {
//       errorCorrectionLevel: "H",
//       type: "png",
//     });

//     const newCertificate = new Certificate({
//       certificateHash,
//       studentName,
//       courseName,
//       issuerName,
//       issueDate: new Date(),
//       isValid: true,
//       qrCodeUrl: qrCodeImagePath,
//     });

//     await newCertificate.save();

//     res.status(200).json({
//       message: "Certificate issued successfully",
//       certificateHash,
//       qrCodeUrl: newCertificate.qrCodeUrl,
//     });
//   } catch (error) {
//     console.error("Error issuing certificate:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to issue certificate", error: error.message });
//   }
// };

// // Validate Certificate
// exports.validateCertificate = async (req, res) => {
//   try {
//     const { certificateHash } = req.params;

//     if (!certificateHash) {
//       return res.status(400).json({ message: "Certificate hash is required" });
//     }

//     // Call smart contract to check validity
//     const isValid = await contract.methods
//       .validateCertificate(certificateHash)
//       .call();

//     res.status(200).json({ isValid });
//   } catch (error) {
//     console.error("Error validating certificate:", error);
//     res.status(500).json({
//       message: "Failed to validate certificate",
//       error: error.message,
//     });
//   }
// };

// // Revoke Certificate
// exports.revokeCertificate = async (req, res) => {
//   try {
//     const { certificateHash } = req.params;

//     if (!certificateHash) {
//       return res.status(400).json({ message: "Certificate hash is required" });
//     }

//     const accounts = await web3.eth.getAccounts();
//     if (accounts.length === 0) {
//       return res.status(500).json({ message: "No accounts available" });
//     }

//     // Estimate gas
//     const gasEstimate = await contract.methods
//       .revokeCertificate(certificateHash)
//       .estimateGas({ from: accounts[0] });

//     // Convert BigInt to Number (if applicable)
//     const gasLimit = Number(gasEstimate) || DEFAULT_GAS_LIMIT;

//     // Send transaction to revoke certificate
//     await contract.methods
//       .revokeCertificate(certificateHash)
//       .send({ from: accounts[0], gas: gasLimit });

//     // Update certificate status in database
//     await Certificate.updateOne({ certificateHash }, { isValid: false });

//     res.status(200).json({ message: "Certificate revoked successfully" });
//   } catch (error) {
//     console.error("Error revoking certificate:", error);
//     res.status(500).json({
//       message: "Failed to revoke certificate",
//       error: error.message,
//     });
//   }
// };

// // Get Certificate Data
// exports.getCertificateData = async (req, res) => {
//   try {
//     const { certificateHash } = req.params;

//     if (!certificateHash) {
//       return res.status(400).json({ message: "Certificate hash is required" });
//     }

//     const certificate = await Certificate.findOne({ certificateHash });

//     if (!certificate) {
//       return res.status(404).json({ message: "Certificate not found" });
//     }

//     res.status(200).json(certificate);
//   } catch (error) {
//     console.error("Error retrieving certificate data:", error);
//     res.status(500).json({
//       message: "Failed to retrieve certificate data",
//       error: error.message,
//     });
//   }
// };

// Original Working API
// exports.issueCertificate = async (req, res) => {
//   try {
//     const { studentName, courseName, issuerName } = req.body;

//     if (!studentName || !courseName || !issuerName) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const accounts = await web3.eth.getAccounts();
//     if (accounts.length === 0) {
//       return res.status(500).json({ message: "No accounts available" });
//     }

//     // Estimate gas
//     const gasEstimate = await contract.methods
//       .issueCertificate(studentName, courseName, issuerName)
//       .estimateGas({ from: accounts[0] });

//     const gasLimit = Number(gasEstimate) || DEFAULT_GAS_LIMIT;

//     const result = await contract.methods
//       .issueCertificate(studentName, courseName, issuerName)
//       .send({ from: accounts[0], gas: gasLimit });

//     if (!result.events || !result.events.CertificateIssued) {
//       return res
//         .status(500)
//         .json({ message: "CertificateIssued event not found" });
//     }

//     const certificateHash =
//       result.events.CertificateIssued.returnValues.certificateHash;

//     // Generate QR code
//     const qrCodeData = certificateHash;
//     const qrCodeImagePath = path.join(
//       "uploads/qrCodes",
//       `${certificateHash}.png`
//     );

//     await QRCode.toFile(qrCodeImagePath, qrCodeData, {
//       errorCorrectionLevel: "H",
//       type: "png",
//     });

//     const newCertificate = new Certificate({
//       certificateHash,
//       studentName,
//       courseName,
//       issuerName,
//       issueDate: new Date(),
//       isValid: true,
//       qrCodeUrl: qrCodeImagePath,
//       owner: req.user._id, // Assuming the user is authenticated
//     });

//     await newCertificate.save();

//     res.status(200).json({
//       message: "Certificate issued successfully",
//       certificateHash,
//       qrCodeUrl: newCertificate.qrCodeUrl,
//     });
//   } catch (error) {
//     console.error("Error issuing certificate:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to issue certificate", error: error.message });
//   }
// };

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
// exports.issueCertificate = async (req, res) => {
//   try {
//     const { studentName, courseName, issuerName, studentEmail } = req.body;

//     if (!studentName || !courseName || !issuerName || !studentEmail) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const accounts = await web3.eth.getAccounts();
//     if (accounts.length === 0) {
//       return res.status(500).json({ message: "No accounts available" });
//     }

//     // Estimate gas
//     const gasEstimate = await contract.methods
//       .issueCertificate(studentName, courseName, issuerName)
//       .estimateGas({ from: accounts[0] });

//     const gasLimit = Number(gasEstimate) || DEFAULT_GAS_LIMIT;

//     const result = await contract.methods
//       .issueCertificate(studentName, courseName, issuerName)
//       .send({ from: accounts[0], gas: gasLimit });

//     if (!result.events || !result.events.CertificateIssued) {
//       return res
//         .status(500)
//         .json({ message: "CertificateIssued event not found" });
//     }

//     const certificateHash =
//       result.events.CertificateIssued.returnValues.certificateHash;

//     // Generate QR code
//     const qrCodeData = certificateHash;
//     const qrCodeImagePath = path.join(
//       "uploads/qrCodes",
//       `${certificateHash}.png`
//     );

//     await QRCode.toFile(qrCodeImagePath, qrCodeData, {
//       errorCorrectionLevel: "H",
//       type: "png",
//     });

//     const newCertificate = new Certificate({
//       certificateHash,
//       studentName,
//       courseName,
//       issuerName,
//       issueDate: new Date(),
//       isValid: true,
//       qrCodeUrl: qrCodeImagePath,
//       owner: req.user._id, // Assuming the user is authenticated
//     });

//     await newCertificate.save();

//     // Send email to the student
//     const mailOptions = {
//       from: "gk.smtp.dev@gmail.com", // Your email
//       to: studentEmail,
//       subject: "Your Certificate Has Been Issued",
//       text: `Dear ${studentName},\n\nYour certificate for the course ${courseName} issued by ${issuerName} has been successfully issued.\n\nYou can view your certificate using the QR code attached.\n\nBest Regards,\nYour Certification Team`,
//       attachments: [
//         {
//           filename: `${certificateHash}.png`,
//           path: qrCodeImagePath,
//           cid: "certificateQrCode", // Same cid value as in the html img src
//         },
//       ],
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(200).json({
//       message: "Certificate issued successfully and email sent",
//       certificateHash,
//       qrCodeUrl: newCertificate.qrCodeUrl,
//     });
//   } catch (error) {
//     console.error("Error issuing certificate:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to issue certificate", error: error.message });
//   }
// };
// exports.issueCertificate = async (req, res) => {
//   try {
//     const { studentName, courseName, issuerName, studentEmail } = req.body;

//     if (!studentName || !courseName || !issuerName || !studentEmail) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const accounts = await web3.eth.getAccounts();
//     if (accounts.length === 0) {
//       return res.status(500).json({ message: "No accounts available" });
//     }

//     // Estimate gas
//     let gasEstimate;
//     try {
//       gasEstimate = await contract.methods
//         .issueCertificate(studentName, courseName, issuerName)
//         .estimateGas({ from: accounts[0] });
//     } catch (estimateError) {
//       console.error("Error estimating gas:", estimateError);
//       return res.status(500).json({
//         message: "Error estimating gas",
//         error: estimateError.message,
//       });
//     }

//     const gasLimit = Math.max(Number(gasEstimate) * 2, DEFAULT_GAS_LIMIT);

//     // Send transaction
//     let result;
//     try {
//       result = await contract.methods
//         .issueCertificate(studentName, courseName, issuerName)
//         .send({ from: accounts[0], gas: gasLimit });
//     } catch (sendError) {
//       console.error("Error sending transaction:", sendError);
//       return res
//         .status(500)
//         .json({ message: "Transaction failed", error: sendError.message });
//     }

//     if (!result.events || !result.events.CertificateIssued) {
//       return res
//         .status(500)
//         .json({ message: "CertificateIssued event not found" });
//     }

//     const certificateHash =
//       result.events.CertificateIssued.returnValues.certificateHash;

//     // Generate QR code
//     const qrCodeData = certificateHash;
//     const qrCodeImagePath = path.join(
//       "uploads/qrCodes",
//       `${certificateHash}.png`
//     );
//     try {
//       await QRCode.toFile(qrCodeImagePath, qrCodeData, {
//         errorCorrectionLevel: "H",
//         type: "png",
//       });
//     } catch (qrError) {
//       console.error("Error generating QR code:", qrError);
//       return res
//         .status(500)
//         .json({ message: "Error generating QR code", error: qrError.message });
//     }

//     // Generate PDF certificate
//     const pdfDoc = new PDFDocument();
//     const pdfPath = path.join("uploads/certificates", `${certificateHash}.pdf`);
//     pdfDoc.pipe(fs.createWriteStream(pdfPath));

//     pdfDoc.fontSize(25).text("Certificate of Completion", { align: "center" });
//     pdfDoc.moveDown();
//     pdfDoc
//       .fontSize(20)
//       .text(`This is to certify that ${studentName}`, { align: "center" });
//     pdfDoc.text(`has successfully completed the course ${courseName}`, {
//       align: "center",
//     });
//     pdfDoc.text(`on ${new Date().toLocaleDateString()}`, { align: "center" });
//     pdfDoc.moveDown();
//     pdfDoc.text(`Issued by: ${issuerName}`, { align: "center" });
//     pdfDoc.moveDown();
//     pdfDoc.image(qrCodeImagePath, {
//       fit: [100, 100],
//       align: "right",
//       valign: "bottom",
//     });
//     pdfDoc.text("Scan the QR code to verify the certificate", {
//       align: "right",
//     });

//     pdfDoc.end();

//     // Create new certificate record
//     const newCertificate = new Certificate({
//       certificateHash,
//       studentName,
//       courseName,
//       issuerName,
//       issueDate: new Date(),
//       isValid: true,
//       qrCodeUrl: qrCodeImagePath,
//       pdfUrl: pdfPath,
//       owner: req.user._id, // Assuming the user is authenticated
//     });

//     try {
//       await newCertificate.save();
//     } catch (saveError) {
//       console.error("Error saving certificate:", saveError);
//       return res.status(500).json({
//         message: "Error saving certificate",
//         error: saveError.message,
//       });
//     }

//     // Send email to the student
//     const subject = "Certificate Issued";
//     const text = `Dear ${studentName},\n\nCongratulations on completing the ${courseName} course. Your certificate has been issued successfully.\n\nYou can view and verify your certificate using the QR code below:\n\n[QR Code URL]\n\nBest regards,\n${issuerName}`;
//     try {
//       await sendCertificateEmail(studentEmail, subject, text, qrCodeData);
//     } catch (emailError) {
//       console.error("Error sending email:", emailError);
//       return res
//         .status(500)
//         .json({ message: "Error sending email", error: emailError.message });
//     }

//     res.status(200).json({
//       message: "Certificate issued successfully",
//       certificateHash,
//       qrCodeUrl: newCertificate.qrCodeUrl,
//       pdfUrl: newCertificate.pdfUrl,
//     });
//   } catch (error) {
//     console.error("Error issuing certificate:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to issue certificate", error: error.message });
//   }
// };

exports.issueCertificate = async (req, res) => {
  try {
    const { studentName, courseName, issuerName, studentEmail } = req.body;

    if (!studentName || !courseName || !issuerName || !studentEmail) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      return res.status(500).json({ message: "No accounts available" });
    }

    // Estimate gas
    let gasEstimate;
    try {
      gasEstimate = await contract.methods
        .issueCertificate(studentName, courseName, issuerName)
        .estimateGas({ from: accounts[0] });
    } catch (estimateError) {
      console.error("Error estimating gas:", estimateError);
      return res.status(500).json({
        message: "Error estimating gas",
        error: estimateError.message,
      });
    }

    const gasLimit = Math.max(Number(gasEstimate) * 2, DEFAULT_GAS_LIMIT);

    // Send transaction
    let result;
    try {
      result = await contract.methods
        .issueCertificate(studentName, courseName, issuerName)
        .send({ from: accounts[0], gas: gasLimit });
    } catch (sendError) {
      console.error("Error sending transaction:", sendError);
      return res
        .status(500)
        .json({ message: "Transaction failed", error: sendError.message });
    }

    if (!result.events || !result.events.CertificateIssued) {
      return res
        .status(500)
        .json({ message: "CertificateIssued event not found" });
    }

    const certificateHash =
      result.events.CertificateIssued.returnValues.certificateHash;

    // Generate QR code
    const qrCodeData = certificateHash;
    const qrCodeImagePath = path.join(
      "uploads/qrCodes",
      `${certificateHash}.png`
    );
    try {
      await QRCode.toFile(qrCodeImagePath, qrCodeData, {
        errorCorrectionLevel: "H",
        type: "png",
      });
    } catch (qrError) {
      console.error("Error generating QR code:", qrError);
      return res
        .status(500)
        .json({ message: "Error generating QR code", error: qrError.message });
    }

    // Create new certificate record
    const newCertificate = new Certificate({
      certificateHash,
      studentName,
      courseName,
      issuerName,
      issueDate: new Date(),
      isValid: true,
      qrCodeUrl: qrCodeImagePath,
      pdfUrl: "", // The PDF URL will be generated in the email function
      owner: req.user._id, // Assuming the user is authenticated
    });

    try {
      await newCertificate.save();
    } catch (saveError) {
      console.error("Error saving certificate:", saveError);
      return res.status(500).json({
        message: "Error saving certificate",
        error: saveError.message,
      });
    }

    // Send email to the student
    const issueDate = newCertificate.issueDate.toLocaleDateString();
    try {
      await sendCertificateEmail(
        studentEmail,
        studentName,
        courseName,
        issueDate,
        qrCodeImagePath,
        issuerName, // Passing issuerName to include in the email content,
        certificateHash
      );
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res
        .status(500)
        .json({ message: "Error sending email", error: emailError.message });
    }

    res.status(200).json({
      message: "Certificate issued successfully",
      certificateHash,
      qrCodeUrl: newCertificate.qrCodeUrl,
    });
  } catch (error) {
    console.error("Error issuing certificate:", error);
    res
      .status(500)
      .json({ message: "Failed to issue certificate", error: error.message });
  }
};

exports.validateCertificate = async (req, res) => {
  try {
    const { certificateHash } = req.params;

    if (!certificateHash) {
      return res.status(400).json({ message: "Certificate hash is required" });
    }

    // Call smart contract to check validity
    const isValid = await contract.methods
      .validateCertificate(certificateHash)
      .call();

    res.status(200).json({ isValid });
  } catch (error) {
    console.error("Error validating certificate:", error);
    res.status(500).json({
      message: "Failed to validate certificate",
      error: error.message,
    });
  }
};

// exports.revokeCertificate = async (req, res) => {
//   try {
//     const { certificateHash } = req.params;

//     if (!certificateHash) {
//       return res.status(400).json({ message: "Certificate hash is required" });
//     }

//     const accounts = await web3.eth.getAccounts();
//     if (accounts.length === 0) {
//       return res.status(500).json({ message: "No accounts available" });
//     }

//     // Estimate gas
//     const gasEstimate = await contract.methods
//       .revokeCertificate(certificateHash)
//       .estimateGas({ from: accounts[0] });

//     const gasLimit = Math.max(Number(gasEstimate) * 2, DEFAULT_GAS_LIMIT);

//     // Send transaction to revoke certificate
//     await contract.methods
//       .revokeCertificate(certificateHash)
//       .send({ from: accounts[0], gas: gasLimit });

//     // Update certificate status in database
//     await Certificate.updateOne({ certificateHash }, { isValid: false });

//     res.status(200).json({ message: "Certificate revoked successfully" });
//   } catch (error) {
//     console.error("Error revoking certificate:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to revoke certificate", error: error.message });
//   }
// };

// exports.revokeCertificate = async (req, res) => {
//   try {
//     const { certificateHash } = req.params;

//     if (!certificateHash) {
//       return res.status(400).json({ message: "Certificate hash is required" });
//     }

//     const accounts = await web3.eth.getAccounts();
//     if (accounts.length === 0) {
//       return res.status(500).json({ message: "No accounts available" });
//     }

//     const gasEstimate = await contract.methods
//       .revokeCertificate(certificateHash)
//       .estimateGas({ from: accounts[0] });

//     const gasLimit = Number(gasEstimate) || DEFAULT_GAS_LIMIT;

//     await contract.methods
//       .revokeCertificate(certificateHash)
//       .send({ from: accounts[0], gas: gasLimit });

//     await Certificate.updateOne({ certificateHash }, { isValid: false });

//     res.status(200).json({ message: "Certificate revoked successfully" });
//   } catch (error) {
//     console.error("Error revoking certificate:", error);

//     let errorMessage = "Failed to revoke certificate";
//     if (error.message.includes("gas")) {
//       errorMessage =
//         "Transaction failed due to gas issues. Please check gas settings.";
//     } else if (error.message.includes("revert")) {
//       errorMessage =
//         "Smart contract execution reverted. Please check the contract logic.";
//     } else if (error.message.includes("network")) {
//       errorMessage = "Network error. Please try again later.";
//     }

//     res.status(500).json({ message: errorMessage, error: error.message });
//   }
// };

exports.revokeCertificate = async (req, res) => {
  try {
    const { certificateHash } = req.params;

    if (!certificateHash) {
      return res.status(400).json({ message: "Certificate hash is required" });
    }

    // Check the database to see if the certificate is already revoked
    const certificate = await Certificate.findOne({ certificateHash });

    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    if (!certificate.isValid) {
      return res
        .status(400)
        .json({ message: "Certificate is already revoked" });
    }

    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      return res.status(500).json({ message: "No accounts available" });
    }

    // Estimate gas
    const gasEstimate = await contract.methods
      .revokeCertificate(certificateHash)
      .estimateGas({ from: accounts[0] });

    const gasLimit = Number(gasEstimate) || DEFAULT_GAS_LIMIT;

    // Send transaction to revoke certificate
    await contract.methods
      .revokeCertificate(certificateHash)
      .send({ from: accounts[0], gas: gasLimit });

    // Update certificate status in the database
    await Certificate.updateOne({ certificateHash }, { isValid: false });

    res.status(200).json({ message: "Certificate revoked successfully" });
  } catch (error) {
    console.error("Error revoking certificate:", error);

    let errorMessage = "Failed to revoke certificate";
    if (error.message.includes("gas")) {
      errorMessage =
        "Transaction failed due to gas issues. Please check gas settings.";
    } else if (error.message.includes("revert")) {
      errorMessage =
        "Smart contract execution reverted. Please check the contract logic.";
    } else if (error.message.includes("network")) {
      errorMessage = "Network error. Please try again later.";
    }

    res.status(500).json({ message: errorMessage, error: error.message });
  }
};

exports.getCertificateData = async (req, res) => {
  try {
    const { certificateHash } = req.params;

    if (!certificateHash) {
      return res.status(400).json({ message: "Certificate hash is required" });
    }

    const certificate = await Certificate.findOne({ certificateHash });

    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    res.status(200).json(certificate);
  } catch (error) {
    console.error("Error retrieving certificate data:", error);
    res.status(500).json({
      message: "Failed to retrieve certificate data",
      error: error.message,
    });
  }
};

exports.searchCertificate = async (req, res) => {
  const { searchTerm } = req.query;

  if (!searchTerm) {
    return res
      .status(400)
      .json({ success: false, error: "Search term is required" });
  }

  try {
    // Create a case-insensitive regular expression for the search term
    const regex = new RegExp(searchTerm, "i");

    // Determine if searchTerm is a valid date
    const isDate = !isNaN(Date.parse(searchTerm));
    let dateQuery = {};

    if (isDate) {
      // Handle date range search if searchTerm is a valid date
      const searchDate = new Date(searchTerm);
      dateQuery = {
        issueDate: {
          $gte: new Date(searchDate.setHours(0, 0, 0, 0)),
          $lt: new Date(searchDate.setHours(23, 59, 59, 999)),
        },
      };
    }

    // Build query object to search across multiple fields
    const query = {
      $or: [
        { studentName: regex },
        { certificateHash: searchTerm },
        { courseName: regex },
        { issuerName: regex },
        ...(isDate ? [dateQuery] : []), // Include dateQuery only if it's a valid date
      ],
    };

    // Find certificates based on the query object
    const certificates = await Certificate.find(query);

    // Return the results in a consistent format
    res
      .status(200)
      .json({ success: true, count: certificates.length, data: certificates });
  } catch (error) {
    console.error("Error searching certificates:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred while searching for certificates",
    });
  }
};

exports.getAllCertificates = async (req, res) => {
  try {
    // Find all certificates
    const certificates = await Certificate.find().populate(
      "owner",
      "name email"
    );

    // Send the response with the certificates
    res.status(200).json({
      success: true,
      count: certificates.length,
      data: certificates,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.getCertificatesByOwnerId = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from request token
    console.log(userId);
    // Query the Certificate collection for certificates owned by the user
    const certificates = await Certificate.find({ owner: userId });

    if (!certificates.length) {
      return res.status(404).json({
        status: "fail",
        message: "No certificates found for this user",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        certificates,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
