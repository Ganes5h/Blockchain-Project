const DigiLocker = require("../models/digiLockerModel");
const Certificate = require("../models/certificateModel");

exports.createDigiLocker = async (req, res) => {
  try {
    const existingDigiLocker = await DigiLocker.findOne({
      userId: req.user.id,
    });
    if (existingDigiLocker) {
      return res.status(400).json({
        status: "fail",
        message: "DigiLocker already exists for this user",
      });
    }

    const digiLocker = await DigiLocker.create({
      userId: req.user.id,
    });

    res.status(201).json({
      status: "success",
      data: {
        digiLocker,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getDigiLocker = async (req, res) => {
  try {
    const digiLocker = await DigiLocker.findOne({
      userId: req.user.id,
    }).populate("certificates");

    if (!digiLocker) {
      return res.status(404).json({
        status: "fail",
        message: "DigiLocker not found for this user",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        digiLocker,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.addCertificateToDigiLocker = async (req, res) => {
  try {
    const { certificateId } = req.params;

    const certificate = await Certificate.findById(certificateId);
    if (!certificate) {
      return res.status(404).json({
        status: "fail",
        message: "Certificate not found",
      });
    }

    const digiLocker = await DigiLocker.findOne({ userId: req.user.id });
    if (!digiLocker) {
      return res.status(404).json({
        status: "fail",
        message: "DigiLocker not found for this user",
      });
    }

    if (digiLocker.certificates.includes(certificateId)) {
      return res.status(400).json({
        status: "fail",
        message: "Certificate already exists in the DigiLocker",
      });
    }

    digiLocker.certificates.push(certificateId);
    digiLocker.lastUpdated = Date.now();
    await digiLocker.save();

    res.status(200).json({
      status: "success",
      message: "Certificate added to DigiLocker",
      data: {
        digiLocker,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.removeCertificateFromDigiLocker = async (req, res) => {
  try {
    const { certificateId } = req.params;

    const digiLocker = await DigiLocker.findOne({ userId: req.user.id });
    if (!digiLocker) {
      return res.status(404).json({
        status: "fail",
        message: "DigiLocker not found for this user",
      });
    }

    const certificateIndex = digiLocker.certificates.indexOf(certificateId);
    if (certificateIndex === -1) {
      return res.status(404).json({
        status: "fail",
        message: "Certificate not found in the DigiLocker",
      });
    }

    digiLocker.certificates.splice(certificateIndex, 1);
    digiLocker.lastUpdated = Date.now();
    await digiLocker.save();

    res.status(200).json({
      status: "success",
      message: "Certificate removed from DigiLocker",
      data: {
        digiLocker,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// exports.getDigiLockerById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Find the DigiLocker by ID and populate the certificates
//     const digiLocker = await DigiLocker.findById(id).populate("certificates");

//     if (!digiLocker) {
//       return res.status(404).json({
//         status: "fail",
//         message: "DigiLocker not found",
//       });
//     }

//     res.status(200).json({
//       status: "success",
//       data: {
//         digiLocker,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: err.message,
//     });
//   }
// };

