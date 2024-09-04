const User = require("../models/userModel");
const sendVerificationEmail = require("../utils/sendVerificationEmail");
const crypto = require("crypto");
const DigiLocker = require("../models/digiLockerModel");
const Certificate = require("../models/certificateModel");
const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET; // Replace with your secret key

// Create a new admin
exports.createAdmin = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create and save the new admin
    const admin = new Admin({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await admin.save();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin login
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: admin._id, role: admin.role }, JWT_SECRET, {
      expiresIn: "1h", // Token expiration time
    });

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify user request
exports.verifyUser = async (req, res) => {
  try {
    const { userId, action } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (action === "approve") {
      user.isVerified = true;
      user.verificationStatus = "approved";
      await user.save();

      await sendVerificationEmail({
        userName: user.fullName,
        email: user.email,
        subject: "Registration Approved",
        message: `Dear ${user.fullName},\n\nYour registration request has been approved. You can now log in with the following credentials:\n\nEmail: ${user.email}\nPassword: The password you set during registration\nIf you have forgotten your password please reset it using forget password from our website.\n\nThank you!`,
      });

      res.status(200).json({
        status: "success",
        message: "User approved and email sent with credentials",
      });
    } else if (action === "reject") {
      user.verificationStatus = "rejected";
      await user.save();

      // Send rejection email
      await sendVerificationEmail({
        userName: user.fullName,
        email: user.email,
        subject: "Registration Rejected",
        message: `\n\nWe regret to inform you that your registration request has been rejected. Please contact support for further assistance.\n\nThank you.`,
      });

      res.status(200).json({
        status: "success",
        message: "User rejected and notification sent",
      });
    } else {
      res
        .status(400)
        .json({ status: "fail", message: "Invalid action specified" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// router.get("/users/verification/:status", async (req, res) => {
exports.getUsersByVerificationStatus = async (req, res) => {
  try {
    const { status } = req.params;

    // Validate the status parameter
    const validStatuses = ["pending", "approved", "rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid verification status" });
    }

    // Find users based on the verification status
    const users = await User.find({ verificationStatus: status });

    res.status(200).json({
      message: `Users with ${status} status retrieved successfully`,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Dashboard APIS
exports.getUserCountByRole = async (req, res) => {
  try {
    const roles = ["government", "student", "industry", "institute"];
    const counts = {};

    for (const role of roles) {
      const count = await User.countDocuments({ role });
      counts[role] = count;
    }

    res.status(200).json({ status: "success", data: counts });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.getTotalCertificates = async (req, res) => {
  try {
    const totalIssued = await Certificate.countDocuments({ isValid: true });
    const totalRevoked = await Certificate.countDocuments({ isValid: false });

    res.status(200).json({
      status: "success",
      data: {
        issued: totalIssued,
        revoked: totalRevoked,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.getCertificatesByRole = async (req, res) => {
  const { role } = req.query;

  if (!role) {
    return res
      .status(400)
      .json({ status: "fail", message: "Role is required" });
  }

  try {
    // Fetch users with the given role
    const users = await User.find({ role }).select("_id");
    const userIds = users.map((user) => user._id);

    // Get certificates issued and revoked for these users
    const issuedCount = await Certificate.countDocuments({
      owner: { $in: userIds },
      isValid: true,
    });
    const revokedCount = await Certificate.countDocuments({
      owner: { $in: userIds },
      isValid: false,
    });

    res.status(200).json({
      status: "success",
      data: {
        issued: issuedCount,
        revoked: revokedCount,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.getDigiLockersByRole = async (req, res) => {
  const { role } = req.query;

  if (!role) {
    return res
      .status(400)
      .json({ status: "fail", message: "Role is required" });
  }

  try {
    // Fetch users with the given role
    const users = await User.find({ role }).select("_id");
    const userIds = users.map((user) => user._id);

    // Get the count of DigiLockers for these users
    const lockerCount = await DigiLocker.countDocuments({
      userId: { $in: userIds },
    });

    res.status(200).json({
      status: "success",
      data: lockerCount,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
