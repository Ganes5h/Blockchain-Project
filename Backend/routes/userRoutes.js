const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);

router.use(authMiddleware.protect); // Protect all routes after this middleware

router.get("/:id", userController.getUser);
router.patch("/:id", userController.updateUser);

module.exports = router;
