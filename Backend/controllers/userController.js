const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const crypto = require("crypto");
const sendEmail = require("../utils/emailOTP");
const sendRegisterEmail = require("../utils/emailRegisterRequest");
const Admin = require("../models/adminModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      fullName: req.body.fullName,
      organization: req.body.organization,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    console.log(user.comparePassword(password));

    // Check if the user is verified
    if (!user.isVerified || user.verificationStatus !== "approved") {
      return res.status(403).json({
        status: "fail",
        message: "Your account has not been verified or has been rejected.",
      });
    }
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }
    const role = user.role;
    const token = signToken(user._id);

    res.status(200).json({
      status: "success",
      token,
      user,
      role,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Please provide email and password",
//       });
//     }

//     const user = await User.findOne({ email }).select("+password");

//     if (!user || !(await user.comparePassword(password))) {
//       return res.status(401).json({
//         status: "fail",
//         message: "Incorrect email or password",
//       });
//     }

//     const token = signToken(user._id);

//     res.status(200).json({
//       status: "success",
//       token,
//       user: {
//         id: user._id,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: "error",
//       message: err.message,
//     });
//   }
// };

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "No user found with that ID",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "No user found with that ID",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "There is no user with that email address.",
      });
    }

    // Generate OTP and save it
    const otp = user.createPasswordResetOTP();
    await user.save({ validateBeforeSave: false });

    // Send OTP via email
    const message = `Your password reset OTP is: ${otp}. It is valid for 10 minutes.`;
    try {
      await sendEmail({
        name: user.username,
        otp,
        email: user.email,
        subject: "Your password reset OTP (valid for 2 minutes)",
        message,
      });

      res.status(200).json({
        status: "success",
        message: "OTP sent to email!",
      });
    } catch (err) {
      // Clear OTP if email sending fails
      user.passwordResetOTP = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      res.status(500).json({
        status: "fail",
        message: "There was an error sending the email. Try again later!",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// exports.resetPassword = async (req, res) => {
//   try {
//     // Hash the OTP from the request
//     const hashedOTP = req.body.otp;
//     // crypto
//     //   .createHash("sha256")
//     //   .update(req.body.otp)
//     //   .digest("hex");
//     console.log(req.body.otp);
//     // Find the user by the hashed OTP and check if the OTP is valid
//     const user = await User.findOne({
//       passwordResetOTP: hashedOTP,
//       passwordResetExpires: { $gt: Date.now() }, // Ensure the OTP has not expired
//     });
//     console.log(user);

//     if (!user) {
//       return res.status(400).json({
//         status: "fail",
//         message: "OTP is invalid or has expired.",
//       });
//     }

//     // Update the user's password and clear the OTP fields
//     user.password = req.body.password;
//     user.passwordResetOTP = undefined;
//     user.passwordResetExpires = undefined;

//     console.log("Hashed OTP:", hashedOTP);
//     console.log("Stored OTP:", user.passwordResetOTP);
//     console.log("Expiry Time:", user.passwordResetExpires);

//     await user.save();

//     // Send confirmation email or response
//     res.status(200).json({
//       status: "success",
//       message: "Password has been reset successfully.",
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: err.message,
//     });
//   }
// };

exports.resetPassword = async (req, res) => {
  try {
    // Hash the OTP provided by the user
    const hashedOTP = crypto
      .createHash("sha256")
      .update(req.body.otp)
      .digest("hex");

    // Find the user by hashed OTP and verify its validity
    const user = await User.findOne({
      passwordResetOTP: hashedOTP,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "OTP is invalid or has expired.",
      });
    }

    // Update the user's password and clear OTP fields
    user.password = req.body.newPassword;
    user.passwordResetOTP = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // Send confirmation email or response
    res.status(200).json({
      status: "success",
      message: "Password has been reset successfully.",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Register request
exports.registerRequest = async (req, res) => {
  try {
    const { username, email, password, role, fullName, organization } =
      req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Save files
    const idProof = req.files.idProof[0].path;
    const authorizationLetter = req.files.authorizationLetter[0].path;

    // Create user
    const user = new User({
      username,
      email,
      password,
      role,
      fullName,
      organization,
      verificationDocs: { idProof, authorizationLetter },
    });

    // Notify admin (for this example, we notify all admins)
    // const admins = await Admin.find({ role: "verifier" });
    // const adminEmails = admins.map((admin) => admin.email);

    // if (adminEmails.length > 0) {
    await sendRegisterEmail({
      username,
      organization,
      role,
      fullName,
      useremail: email, // User's email as sender
      email: process.env.SMTP_USER,
      subject: "New User Registration Request",
      message: `A new user with the email ${email} has requested registration. Please review their documents and approve/reject the request.`,
    });
    // }
    await user.save();
    res
      .status(201)
      .json({ message: "Registration request submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
