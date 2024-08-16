// const mongoose = require("mongoose");

// const CertificateSchema = new mongoose.Schema({
//   certificateHash: { type: String, required: true, unique: true },
//   studentName: String,
//   courseName: String,
//   issuerName: String,
//   issueDate: Date,
//   isValid: Boolean,
// });

// module.exports = mongoose.model("Certificate", CertificateSchema);
// const mongoose = require("mongoose");

// const certificateSchema = new mongoose.Schema({
//   certificateHash: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   studentName: {
//     type: String,
//     required: true,
//   },
//   courseName: {
//     type: String,
//     required: true,
//   },
//   issuerName: {
//     type: String,
//     required: true,
//   },
//   issueDate: {
//     type: Date,
//     default: Date.now,
//   },
//   isValid: {
//     type: Boolean,
//     default: true,
//   },
//   qrCodeUrl: {
//     type: String, // Path to the QR code image
//     required: true,
//   },
//   digilockerUrl: {
//     type: String, // URL or identifier for the certificate in the digital locker
//   },
// });

// module.exports = mongoose.model("Certificate", certificateSchema);

const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  certificateHash: {
    type: String,
    required: true,
    unique: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  issuerName: {
    type: String,
    required: true,
  },
  issueDate: {
    type: Date,
    default: Date.now,
  },
  isValid: {
    type: Boolean,
    default: true,
  },
  qrCodeUrl: {
    type: String,
    required: true,
  },
  digilockerUrl: {
    type: String,
  },
  pdfPath: {
    type: String, // Field for storing the PDF path
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Certificate", certificateSchema);
