// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Certificate {
    
    // Certificate structure
    struct CertificateData {
        string studentName;
        string courseName;
        uint256 issueDate;
        string issuerName;
        bool isValid;
    }

    // Mapping from certificate hash to certificate data
    mapping(bytes32 => CertificateData) private certificates;

    // Address of the government office or educational institution
    address public admin;

    // Events
    event CertificateIssued(bytes32 indexed certificateHash, string studentName, string courseName, string issuerName, uint256 issueDate);
    event CertificateRevoked(bytes32 indexed certificateHash);
    event CertificateValidated(bytes32 indexed certificateHash, bool isValid);

    // Modifier to restrict access to admin only
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    // Constructor to set the admin as the contract deployer
    constructor() {
        admin = msg.sender;
    }

    // Function to issue a certificate
    function issueCertificate(
        string memory _studentName,
        string memory _courseName,
        string memory _issuerName
    ) public onlyAdmin returns (bytes32) {
        // Generate a unique hash for the certificate
        bytes32 certificateHash = keccak256(abi.encodePacked(_studentName, _courseName, _issuerName, block.timestamp));
        
        // Store the certificate data
        certificates[certificateHash] = CertificateData({
            studentName: _studentName,
            courseName: _courseName,
            issueDate: block.timestamp,
            issuerName: _issuerName,
            isValid: true
        });

        // Emit the event for certificate issuance
        emit CertificateIssued(certificateHash, _studentName, _courseName, _issuerName, block.timestamp);

        return certificateHash;
    }

    // Function to validate a certificate
    function validateCertificate(bytes32 _certificateHash) public returns (bool) {
        // Check if the certificate is valid
        CertificateData memory cert = certificates[_certificateHash];
        bool isValid = cert.isValid;
        
        // Emit the event for certificate validation
        emit CertificateValidated(_certificateHash, isValid);

        return isValid;
    }

    // Function to revoke a certificate
    function revokeCertificate(bytes32 _certificateHash) public onlyAdmin {
        // Ensure the certificate exists and is valid
        require(certificates[_certificateHash].isValid, "Certificate is either invalid or already revoked");
        
        // Mark the certificate as invalid
        certificates[_certificateHash].isValid = false;

        // Emit the event for certificate revocation
        emit CertificateRevoked(_certificateHash);
    }

    // Function to retrieve certificate data
    function getCertificateData(bytes32 _certificateHash) public view returns (string memory, string memory, string memory, uint256, bool) {
        CertificateData memory cert = certificates[_certificateHash];
        return (
            cert.studentName,
            cert.courseName,
            cert.issuerName,
            cert.issueDate,
            cert.isValid
        );
    }
}
