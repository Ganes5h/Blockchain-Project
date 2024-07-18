// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract CertificateStore {
    struct Certificate {
        string studentName;
        string course;
        string issuingAuthority;
        string issueDate;
        string expiryDate;
        string certificateHash;
    }

    mapping(uint256 => Certificate) public certificates;
    uint256 public certificateCount;

    event CertificateIssued(uint256 indexed certificateId, string studentName, string course, string issuingAuthority, string issueDate, string expiryDate, string certificateHash);

    function issueCertificate(
        string memory _studentName,
        string memory _course,
        string memory _issuingAuthority,
        string memory _issueDate,
        string memory _expiryDate,
        string memory _certificateHash
    ) public {
        certificateCount++;
        uint256 certificateId = certificateCount;

        certificates[certificateId] = Certificate({
            studentName: _studentName,
            course: _course,
            issuingAuthority: _issuingAuthority,
            issueDate: _issueDate,
            expiryDate: _expiryDate,
            certificateHash: _certificateHash
        });

        emit CertificateIssued(certificateId, _studentName, _course, _issuingAuthority, _issueDate, _expiryDate, _certificateHash);
    }

    function getCertificate(uint256 _certificateId)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        Certificate storage certificate = certificates[_certificateId];
        return (
            certificate.studentName,
            certificate.course,
            certificate.issuingAuthority,
            certificate.issueDate,
            certificate.expiryDate,
            certificate.certificateHash
        );
    }

    function validateCertificate(uint256 _certificateId, string memory _certificateHashToValidate) public view returns (bool) {
        Certificate storage certificate = certificates[_certificateId];
        return keccak256(abi.encodePacked(certificate.certificateHash)) == keccak256(abi.encodePacked(_certificateHashToValidate));
    }
}
