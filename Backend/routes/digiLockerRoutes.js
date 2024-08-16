const express = require("express");
const digiLockerController = require("../controllers/digiLockerController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware.protect); // Protect all DigiLocker routes

router.post("/create", digiLockerController.createDigiLocker);
router.get("/", digiLockerController.getDigiLocker);
// router.get("/", digiLockerController.getDigiLocker);
router.post(
  "/add-certificate/:certificateId",
  digiLockerController.addCertificateToDigiLocker
);
router.delete(
  "/remove-certificate/:certificateId",
  digiLockerController.removeCertificateFromDigiLocker
);

module.exports = router;
