const mongoose = require("mongoose");

const CertificateSchema = new mongoose.Schema({
  certificateHash: { type: String, required: true, unique: true },
  studentName: String,
  courseName: String,
  issuerName: String,
  issueDate: Date,
  isValid: Boolean,
});

module.exports = mongoose.model("Certificate", CertificateSchema);
