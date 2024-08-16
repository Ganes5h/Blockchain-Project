// routes/contactRoutes.js
const express = require("express");
const { contactForm } = require("../controllers/contactController");
const router = express.Router();

router.post("/send-mail", contactForm);

module.exports = router;
