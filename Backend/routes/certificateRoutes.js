const express = require("express");
const router = express.Router();
const certificateController = require("../controllers/certificateController");

// Define routes and associate them with controller methods
router.post("/issue", certificateController.issueCertificate);
router.get(
  "/validate/:certificateHash",
  certificateController.validateCertificate
);
router.post(
  "/revoke/:certificateHash",
  certificateController.revokeCertificate
);
router.get("/data/:certificateHash", certificateController.getCertificateData);

module.exports = router;
