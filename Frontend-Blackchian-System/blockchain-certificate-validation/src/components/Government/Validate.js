import QrScanner from "react-qr-scanner";
import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useSelector } from "react-redux";

function Validate() {
  const [scanResult, setScanResult] = useState("");
  const [manualHash, setManualHash] = useState("");
  const token = useSelector((state) => state.auth.token); // Get token from Redux store
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Check if user is authenticated

  const handleScan = async (data) => {
    if (data) {
      setScanResult(data.text);
      validateCertificate(data.text);
    }
  };

  const handleError = (err) => {
    console.error(err);
    Swal.fire({
      title: "Scanner Error",
      text: "Failed to scan the QR code.",
      icon: "error",
    });
  };

  const validateCertificate = async (hash) => {
    try {
      // Call the validate certificate API
      const response = await axios.get(
        `http://localhost:4000/api/certificates/validate/${hash}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      // Check if the certificate is valid
      if (response.data.isValid) {
        Swal.fire({
          title: "Certificate Validated",
          text: "This certificate is valid!",
          icon: "success",
          width: 600,
          padding: "3em",
          color: "#28a745",
          background: "#fff url(/images/valid-bg.png)",
          backdrop: `
            rgba(0,255,0,0.3)
            url("/images/celebrate.gif")
            left top
            no-repeat
          `,
        });
      } else {
        Swal.fire({
          title: "Invalid Certificate",
          text: "This certificate is not valid.",
          icon: "error",
          width: 600,
          padding: "3em",
          color: "#dc3545",
          background: "#fff url(/images/invalid-bg.png)",
          backdrop: `
            rgba(255,0,0,0.3)
            url("/images/error.gif")
            left top
            no-repeat
          `,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Validation Error",
        text: `Failed to validate certificate: ${error.message}`,
        icon: "error",
      });
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualHash) {
      validateCertificate(manualHash);
    } else {
      Swal.fire({
        title: "Input Error",
        text: "Please enter a valid certificate hash.",
        icon: "warning",
      });
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Validate Certificate</h2>
      <div style={{ display: "inline-block", margin: "20px auto" }}>
        <QrScanner
          delay={300}
          style={{ width: "300px" }}
          onError={handleError}
          onScan={handleScan}
        />
      </div>
      {scanResult && (
        <p>
          Scanned Result: <strong>{scanResult}</strong>
        </p>
      )}
      <div style={{ marginTop: "30px" }}>
        <h3>Or Enter Certificate Hash Manually</h3>
        <form onSubmit={handleManualSubmit}>
          <input
            type="text"
            value={manualHash}
            onChange={(e) => setManualHash(e.target.value)}
            placeholder="Enter certificate hash"
            style={{
              padding: "10px",
              width: "300px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              marginLeft: "10px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#007bff",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Validate
          </button>
        </form>
      </div>
    </div>
  );
}

export default Validate;
