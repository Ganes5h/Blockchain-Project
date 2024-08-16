// index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./config/config"); // Import config to establish connection and log it
const certificateRoutes = require("./routes/certificateRoutes");
const userRoutes = require("./routes/userRoutes");
const digiLockerRoutes = require("./routes/digiLockerRoutes");
const contactRoutes = require("./routes/contactRoutes");
const path = require("path");

// const { web3, contract } = require("./utils/web3");

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use("/qrCodes", express.static(path.join(__dirname, "./uploads/qrCodes")));
app.use(
  "/certificates",
  express.static(path.join(__dirname, "./uploads/certificates"))
);
app.use("/gold", express.static(path.join(__dirname, "./utils/GoldMedal.png")));
app.use("/logo", express.static(path.join(__dirname, "./utils/LOGO.png")));
// Use routes
app.use("/api/certificates", certificateRoutes);
app.use("/api/users", userRoutes);
app.use("/api/digilocker", digiLockerRoutes);
app.use("/api/contact", contactRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
