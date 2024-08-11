const Certificate = require("../models/certificateModel");
const { contract, web3 } = require("../utils/web3");
//  require("../utils/web3");

exports.issueCertificate = async (req, res) => {
  try {
    const { studentName, courseName, issuerName } = req.body;

    // Validate input
    if (!studentName || !courseName || !issuerName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Get accounts
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      return res.status(500).json({ message: "No accounts available" });
    }

    // Estimate gas
    const gasEstimate = await contract.methods
      .issueCertificate(studentName, courseName, issuerName)
      .estimateGas({ from: accounts[0] });

    // Send transaction
    const result = await contract.methods
      .issueCertificate(studentName, courseName, issuerName)
      .send({ from: accounts[0], gas: gasEstimate });

    // Get certificate hash from event
    if (!result.events || !result.events.CertificateIssued) {
      return res
        .status(500)
        .json({ message: "CertificateIssued event not found" });
    }
    const certificateHash =
      result.events.CertificateIssued.returnValues.certificateHash;

    // Save certificate to database
    const newCertificate = new Certificate({
      certificateHash,
      studentName,
      courseName,
      issuerName,
      issueDate: new Date(),
      isValid: true,
    });

    await newCertificate.save();

    // Respond with success
    res
      .status(200)
      .json({ message: "Certificate issued successfully", certificateHash });
  } catch (error) {
    // Log error details (optional, for debugging)
    console.error("Error issuing certificate:", error);

    // Respond with error message
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

    // Respond with the result
    res.status(200).json({ isValid });
  } catch (error) {
    console.error("Error validating certificate:", error);
    res.status(500).json({
      message: "Failed to validate certificate",
      error: error.message,
    });
  }
};

exports.revokeCertificate = async (req, res) => {
  try {
    const { certificateHash } = req.params;

    if (!certificateHash) {
      return res.status(400).json({ message: "Certificate hash is required" });
    }

    // Get accounts
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      return res.status(500).json({ message: "No accounts available" });
    }

    // Estimate gas
    const gasEstimate = await contract.methods
      .revokeCertificate(certificateHash)
      .estimateGas({ from: accounts[0] });

    // Revoke certificate
    await contract.methods
      .revokeCertificate(certificateHash)
      .send({ from: accounts[0], gas: gasEstimate });

    // Update certificate status in the database
    await Certificate.updateOne({ certificateHash }, { isValid: false });

    res.status(200).json({ message: "Certificate revoked successfully" });
  } catch (error) {
    console.error("Error revoking certificate:", error);
    res
      .status(500)
      .json({ message: "Failed to revoke certificate", error: error.message });
  }
};

exports.getCertificateData = async (req, res) => {
  try {
    const { certificateHash } = req.params;

    if (!certificateHash) {
      return res.status(400).json({ message: "Certificate hash is required" });
    }

    // Retrieve certificate from the database
    const certificate = await Certificate.findOne({ certificateHash });

    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    // Respond with the certificate data
    res.status(200).json(certificate);
  } catch (error) {
    console.error("Error retrieving certificate data:", error);
    res
      .status(500)
      .json({
        message: "Failed to retrieve certificate data",
        error: error.message,
      });
  }
};
