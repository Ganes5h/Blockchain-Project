import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import Swal from "sweetalert2"; // Import Sweet Alert

const SignupDialog = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    navigate("/"); // Navigate back to the home page or any other page when the dialog is closed
  };

 

  return (
    <Dialog
      open={open}
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
