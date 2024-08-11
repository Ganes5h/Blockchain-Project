// index.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./config/config"); // Import config to establish connection and log it
const certificateRoutes = require("./routes/certificateRoutes");
// const { web3, contract } = require("./utils/web3");

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Use routes
app.use("/api/certificates", certificateRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
