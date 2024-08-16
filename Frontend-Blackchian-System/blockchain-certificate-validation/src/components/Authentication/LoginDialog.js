import React from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
// import "./LoginDialog.css"; // Import the CSS file for styling

const LoginDialog = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/"); // Navigate back to the home page or any other page when the dialog is closed
  };

  return (
    <Dialog
      open
      onClose={handleClose}
      PaperProps={{
        style: { backdropFilter: "blur(10px)" }, // Apply blur to the background
      }}
      fullWidth
      maxWidth="sm"
    >
      <PerfectScrollbar className="dialog-scrollbar">
        <div className="dialog-content">
          <Login />
        </div>
      </PerfectScrollbar>
    </Dialog>
  );
};

export default LoginDialog;
