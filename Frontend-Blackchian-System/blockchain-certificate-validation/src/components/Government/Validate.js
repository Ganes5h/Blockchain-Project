import QrScanner from "react-qr-scanner";
import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useSelector } from "react-redux";
import CelebrationGif from "../../Images/Celebration.gif";
import { useNavigate } from "react-router-dom";

function Validate() {
  const [scanResult, setScanResult] = useState("");
  const [manualHash, setManualHash] = useState("");
  const token = useSelector((state) => state.auth.token); // Get token from Redux store
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Check if user is authenticated
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
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
          background: `#fff url(${CelebrationGif})`,
          backdrop: `
            rgba(0,255,0,0.3)
            url(${CelebrationGif})
            left top
            no-repeat
            url(${CelebrationGif})
            right top
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
          background: "#fff url(/images/valid-bg.png)",
          backdrop: `
            rgba(255,0,0,0.3)
            url("/images/celebrate.gif")
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
  const handleClick = () => {
    if (user.role === "student") {
      navigate("/student-section");
    } else if (user.role === "industry") {
      navigate("/industry-section");
    } else if (user.role === "government") {
      navigate("/govt-section");
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
    <div
      style={{
        textAlign: "center",
        // marginTop: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "20px",
        position: "relative",
        background: "#0575E",
        background: "-webkit-linear-gradient(to right, #021B79, #0575E6)",
        background: "linear-gradient(to right, #021B79, #0575E6)",
        height: "90vh",
      }}
    >
      <button
        type="button"
        onClick={handleClick}
        className="bg-white text-center w-36 rounded-xl h-10 absolute font-sans text-black text-lg font-semibold group m-4"
        style={{ top: "0px", left: "0" }} // Adjusting the position downwards
      >
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white h-8 w-1/4 flex items-center justify-center absolute left-1 top-[2px] group-hover:w-[128px] z-10 duration-500">
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#FFFFFF"
              d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
            ></path>
            <path
              fill="#FFFFFF"
              d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
            ></path>
          </svg>
        </div>
        <p className="translate-x-2">Go Back</p>
      </button>
      <div style={{ backgroundColor: "white", borderRadius: "10px" }}>
        <h1 style={{ fontSize: "25px", margin: "5px" }}>
          Validate Certificate
        </h1>
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
      /
    </div>
  );
}

export default Validate;
