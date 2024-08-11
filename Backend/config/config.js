// config.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Define your MongoDB configuration
const MONGO_CONFIG = {
  url: process.env.MONGO_URL,
};

// Connect to MongoDB
mongoose
  .connect(MONGO_CONFIG.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Export the configuration
module.exports = MONGO_CONFIG;
