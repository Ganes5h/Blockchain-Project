import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import Swal from "sweetalert2";
import CloseIcon from "@mui/icons-material/Close";

const ApprovedVerification = () => {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/admin/users/verification/approved"
        );
        setUsers(response.data.users);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);

  const rejectUser = async (userId) => {
    try {
      // Show confirmation dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to reject this user?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, reject it!",
        cancelButtonText: "No, cancel",
      });

      if (result.isConfirmed) {
        // Proceed with the API request if confirmed
        await axios.post(`http://localhost:4000/api/admin/verify`, {
          userId: userId,
          action: "reject", // approve or reject
        });

        Swal.fire({
          title: "Success!",
          text: "User rejected successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });

        // Refresh the list of users
        const response = await axios.get(
          "http://localhost:4000/api/admin/users/verification/approved"
        );
        setUsers(response.data.users);
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to reject user.",
        icon: "error",
        confirmButtonText: "OK",
      });

      console.error("Failed to reject user", error);
    }
  };

  const handleClickOpen = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Organization</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.organization}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleClickOpen(user)}
                  >
                    View Documents
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => rejectUser(user._id)}
                    style={{ marginLeft: 8 }}
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>
          Documents
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <div style={{ marginBottom: 20 }}>
                <h4>ID Proof</h4>
                <img
                  src={`http://localhost:4000/documents/${selectedUser.verificationDocs.idProof
                    .split("\\")
                    .pop()}`}
                  alt="ID Proof"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div>
                <h4>Authorization Letter</h4>
                <img
                  src={`http://localhost:4000/documents/${selectedUser.verificationDocs.authorizationLetter
                    .split("\\")
                    .pop()}`}
                  alt="Authorization Letter"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ApprovedVerification;
