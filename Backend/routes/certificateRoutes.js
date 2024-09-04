const express = require("express");
const router = express.Router();
const certificateController = require("../controllers/certificateController");
const authMiddleware = require("../middleware/authMiddleware");

// // Define routes and associate them with controller methods
// router.post("/issue", certificateController.issueCertificate);
// router.get(
//   "/validate/:certificateHash",
//   certificateController.validateCertificate
// );
// router.post(
//   "/revoke/:certificateHash",
//   certificateController.revokeCertificate
// );
// router.get("/data/:certificateHash", certificateController.getCertificateData);

router.use(authMiddleware.protect); // Protect all certificate routes

router.post("/issue", certificateController.issueCertificate);

router.get(
  "/validate/:certificateHash",
  certificateController.validateCertificate
);
router.post(
  "/revoke/:certificateHash",
  authMiddleware.restrictTo("government", "institute"),
  certificateController.revokeCertificate
);
router.get("/data/:certificateHash", certificateController.getCertificateData);
router.get("/search-certificates", certificateController.searchCertificate);
router.get("/all-certificates", certificateController.getAllCertificates);
router.get(
  "/certificates-by-id",
  certificateController.getCertificatesByOwnerId
);
module.exports = router;
