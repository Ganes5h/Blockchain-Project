const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const router = express.Router();
router.post(
  "/register/request",
  upload.fields([
    { name: "idProof", maxCount: 1 },
    { name: "authorizationLetter", maxCount: 1 },
  ]),
  userController.registerRequest
);
router.post("/signup", userController.signup);
router.post("/login", userController.login);
// Route for forgot password
router.post("/forgotPassword", userController.forgotPassword);

// Route for reset password
router.post("/resetPassword", userController.resetPassword);

router.use(authMiddleware.protect); // Protect all routes after this middleware

router.get("/:id", userController.getUser);
router.patch("/:id", userController.updateUser);

module.exports = router;
