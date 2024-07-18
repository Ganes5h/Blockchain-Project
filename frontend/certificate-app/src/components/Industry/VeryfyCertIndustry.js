import React, { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Modal,
} from "@mui/material";
import CertificateIcon from "@mui/icons-material/Description";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QrReader from "react-qr-scanner";
import axios from "axios";

const VerifyComponent = () => {
  const [certificateId, setCertificateId] = useState("");
  const [verificationResult, setVerificationResult] = useState("");
  const [certificateDetails, setCertificateDetails] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = (data) => {
    if (data) {
      if (typeof data === "string") {
        setCertificateId(data); // Set as is if already a string
      } else if (typeof data === "object" && data.text) {
        setCertificateId(data.text); // Extract the text property if data is an object
      } else {
        console.error("Invalid data format:", data);
        toast.error("Error scanning QR code. Please try again.");
      }
      setIsScanning(false);
    }
  };

  const handleError = (err) => {
    console.error(err);
    toast.error("Error scanning QR code. Please try again.");
  };

  const handleVerify = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:4000/validate_certificate",
        {
          hash: certificateId,
        }
      );
      if (response.data.message === "Certificate is valid") {
        setVerificationResult("Certificate is valid");
        setCertificateDetails(response.data.certificate);
      } else {
        setVerificationResult("Certificate is invalid");
        setCertificateDetails(null);
      }
    } catch (error) {
      console.error("Error verifying certificate:", error);
      setVerificationResult(
        "An error occurred while verifying the certificate"
      );
      setCertificateDetails(null);
    }
  };

  const handleCloseModal = () => {
    setCertificateId("");
    setVerificationResult("");
    setCertificateDetails(null);
  };

  return (
    <>
      <ToastContainer />
      <Paper elevation={3} style={{ padding: "30px" }}>
        <div style={{ textAlign: "center" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Verify Component
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Please fill all the fields correctly
          </Typography>
        </div>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            margin="normal"
            placeholder="Enter the Certificate Id"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CertificateIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "20px" }}
            onClick={handleVerify}
          >
            Check
          </Button>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            style={{ marginTop: "20px" }}
            onClick={() => setIsScanning(true)}
          >
            Scan QR Code
          </Button>
          {verificationResult && (
            <Typography variant="subtitle1" color="textPrimary" gutterBottom>
              {verificationResult}
            </Typography>
          )}
          <Modal open={!!certificateDetails} onClose={handleCloseModal}>
            <Box
              sx={{
                position: "absolute",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {certificateDetails && (
                <div>
                  <Typography variant="h5" component="h2">
                    Certificate Details
                  </Typography>
                  <Typography variant="body1">
                    Student ID: {certificateDetails.student_id}
                  </Typography>
                  <Typography variant="body1">
                    Name: {certificateDetails.name}
                  </Typography>
                  <Typography variant="body1">
                    Course: {certificateDetails.course}
                  </Typography>
                  <Typography variant="body1">
                    Grade: {certificateDetails.grade}
                  </Typography>
                  <Typography variant="body1">
                    Expiry Date: {certificateDetails.expiry_date}
                  </Typography>
                </div>
              )}
            </Box>
          </Modal>
        </Box>
        {isScanning && (
          <Box mt={2}>
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%" }}
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setIsScanning(false)}
            >
              Stop Scanning
            </Button>
          </Box>
        )}
      </Paper>
    </>
  );
};

export default VerifyComponent;
