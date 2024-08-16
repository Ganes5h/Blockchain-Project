import React from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const SignupDialog = () => {
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
          <Signup />
        </div>
      </PerfectScrollbar>
    </Dialog>
  );
};

export default SignupDialog;
