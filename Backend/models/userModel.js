// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   role: {
//     type: String,
//     enum: ["government", "student", "industry", "institute"],
//     required: true,
//   },
//   fullName: {
//     type: String,
//     required: true,
//   },
//   organization: {
//     type: String,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// module.exports = mongoose.model("User", userSchema);

// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const crypto = require("crypto");

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   role: {
//     type: String,
//     enum: ["government", "student", "industry", "institute"],
//     required: true,
//   },
//   fullName: {
//     type: String,
//     required: true,
//   },
//   organization: {
//     type: String,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   passwordResetOTP: String,
//   passwordResetExpires: Date,
// });

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// userSchema.methods.createPasswordResetOTP = function () {
//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   this.passwordResetOTP = crypto.createHash("sha256").update(otp).digest("hex");
//   this.passwordResetExpires = Date.now() + 2 * 60 * 1000;
//   return otp;
// };

// module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["government", "student", "industry", "institute"],
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  passwordResetOTP: String,
  passwordResetExpires: Date,

  // Verification-related fields
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  verificationDocs: {
    idProof: {
      type: String, // URL or file path to the uploaded ID Proof document
      required: true,
    },
    authorizationLetter: {
      type: String, // URL or file path to the uploaded Authorization Letter document
      required: true,
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.createPasswordResetOTP = function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.passwordResetOTP = crypto.createHash("sha256").update(otp).digest("hex");
  this.passwordResetExpires = Date.now() + 2 * 60 * 1000;
  return otp;
};

module.exports = mongoose.model("User", userSchema);

// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const crypto = require("crypto");

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//     // select: false, // Ensures password is not returned by default in queries
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   role: {
//     type: String,
//     enum: ["government", "student", "industry", "institute"],
//     required: true,
//   },
//   fullName: {
//     type: String,
//     required: true,
//   },
//   organization: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   passwordResetOTP: String,
//   passwordResetExpires: Date,

//   // Verification-related fields
//   isVerified: {
//     type: Boolean,
//     default: false,
//   },
//   verificationStatus: {
//     type: String,
//     enum: ["pending", "approved", "rejected"],
//     default: "pending",
//   },
//   verificationDocs: {
//     idProof: {
//       type: String, // URL or file path to the uploaded ID Proof document
//       required: true,
//     },
//     authorizationLetter: {
//       type: String, // URL or file path to the uploaded Authorization Letter document
//       required: true,
//     },
//   },
// });

// // Pre-save hook to hash password if modified or new
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// // Method to compare input password with hashed password
// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// // Method to create a password reset OTP
// userSchema.methods.createPasswordResetOTP = function () {
//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   this.passwordResetOTP = crypto.createHash("sha256").update(otp).digest("hex");
//   this.passwordResetExpires = Date.now() + 2 * 60 * 1000; // 2 minutes expiration
//   return otp;
// };

// // Method to update password and ensure it is hashed
// userSchema.methods.updatePassword = async function (newPassword) {
//   this.password = await bcrypt.hash(newPassword, 12);
//   await this.save();
// };

// module.exports = mongoose.model("User", userSchema);
