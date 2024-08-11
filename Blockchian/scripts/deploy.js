const hre = require("hardhat");
const CertificateModule = require("../ignition/modules/Certificate");

async function main() {
  // Deploy the Certificate contract using the CertificateModule
  const { certificate } = await hre.ignition.deploy(CertificateModule);

  // Log the address of the deployed Certificate contract
  console.log(`Certificate deployed to: ${await certificate.getAddress()}`);
}

// Run the deployment script and handle errors
main().catch(console.error);
