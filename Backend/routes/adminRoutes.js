const express = require("express");
const {
  verifyUser,
  getUsersByVerificationStatus,
  getUserCountByRole,
  getTotalCertificates,
  getCertificatesByRole,
  getDigiLockersByRole,
} = require("../controllers/adminController");
const { createAdmin, loginAdmin } = require("../controllers/adminController");

const router = express.Router();

// Route to create a new admin
router.post("/create", createAdmin);

// Route to login an admin
router.post("/login", loginAdmin);

// User verification route
router.post("/verify", verifyUser);

// User information based on Status
router.get("/users/verification/:status", getUsersByVerificationStatus);

// APIs for Admin Dashboard
router.get("/users/count", getUserCountByRole);
router.get("/certificates/total", getTotalCertificates);
router.get("/certificates/role", getCertificatesByRole);
router.get("/digilockers/role", getDigiLockersByRole);

module.exports = router;
