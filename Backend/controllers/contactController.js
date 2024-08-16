// controller/contactController.js
const sendEmail = require("../utils/emailService");

const contactForm = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const subject = `Contact Form Submission from ${name}`;
  const text = `You have a new message from ${name} (${email}):\n\n${message}`;

  try {
    await sendEmail("gneshkugaji@gmail.com", subject, text); // Replace with your actual email
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send email" });
  }
};

module.exports = { contactForm };
