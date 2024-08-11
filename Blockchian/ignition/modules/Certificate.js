const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CertificateModule", (m) => {
  // No parameters needed for the Certificate contract
  // If you had parameters, you would define them here

  // Deploy the Certificate contract
  const certificate = m.contract("Certificate");

  return { certificate };
});
