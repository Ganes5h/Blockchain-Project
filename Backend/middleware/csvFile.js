const multer = require("multer");
const path = require("path");

const csvStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/csvFiles/"); // Folder to store uploaded CSV files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid filename conflicts
  },
});

module.exports = csvStorage;
