const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Certificate", function () {
  let Certificate, certificate, owner, addr1, addr2;

  beforeEach(async function () {
    Certificate = await ethers.getContractFactory("Certificate");
    [owner, addr1, addr2] = await ethers.getSigners();
    certificate = await Certificate.deploy();
    await certificate.deployed();
  });

  it("Should issue, validate, and revoke a certificate", async function () {
    const studentName = "Alice";
    const courseName = "Blockchain";
    const issuerName = "University X";

    // Issue a certificate
    const tx = await certificate
      .connect(owner)
      .issueCertificate(studentName, courseName, issuerName);
    await tx.wait();

    // Retrieve the certificate hash (assuming this function exists)
    const certificateHash = await certificate.getCertificateHash();

    // Validate the certificate
    const isValid = await certificate.validateCertificate(certificateHash);
    expect(isValid).to.be.true;

    // Retrieve certificate data
    const certificateData = await certificate.getCertificateData(
      certificateHash
    );
    expect(certificateData.studentName).to.equal(studentName);
    expect(certificateData.courseName).to.equal(courseName);
    expect(certificateData.issuerName).to.equal(issuerName);
    expect(certificateData.isValid).to.be.true;

    // Revoke the certificate
    await certificate.connect(owner).revokeCertificate(certificateHash);

    // Validate the revoked certificate
    const isRevoked = await certificate.validateCertificate(certificateHash);
    expect(isRevoked).to.be.false;
  });

  it("Should prevent non-admin from revoking a certificate", async function () {
    // Issue a certificate
    const tx = await certificate
      .connect(owner)
      .issueCertificate("Bob", "Web3", "University Y");
    await tx.wait();

    // Try to revoke as a non-admin
    await expect(
      certificate.connect(addr1).revokeCertificate(certificateHash)
    ).to.be.revertedWith("Only admin can perform this action");
  });
});
